import * as assert from "assert";
import * as sinon from "sinon";
import Circle from "../../src/shapes/Circle";
import Hitbox from "../../src/components/Hitbox";
import GameObject from "../../src/GameObject";

const BASE_X = 0;
const COLLIDING_X = BASE_X;
const NOT_COLLIDING_X = Number.POSITIVE_INFINITY;

const Y = 0;
const RADIUS = 5;
const DELTA_TIME = 1;

describe("Hitbox", () => {
  const circle = new Circle(RADIUS);

  let hitbox1: Hitbox;
  let hitbox2: Hitbox;

  let baseGameObject: GameObject;
  let movingGameObject: GameObject;

  let callback: sinon.SinonSpy;

  beforeEach(() => {
    const hurtboxes: Array<Hitbox> = [];
    hitbox1 = new Hitbox(hurtboxes);
    hitbox2 = new Hitbox();
    hurtboxes.push(hitbox2);
  
    baseGameObject = new GameObject({x: BASE_X, y: Y, shape: circle});
    baseGameObject.addComponent(hitbox2);
    movingGameObject = new GameObject({x: NOT_COLLIDING_X, y: Y, shape: circle});
    movingGameObject.addComponent(hitbox1);
  });

  it("calls onHit on every colliding frame", () => {
    callback = sinon.fake();
    hitbox1.addOnHit(callback);

    // objects are not colliding
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.notCalled);

    // objects are colliding
    movingGameObject.transform.position.x = COLLIDING_X;
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.calledOnce);

    // objects are still colliding
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.calledTwice);

    // objects are no longer colliding
    movingGameObject.transform.position.x = NOT_COLLIDING_X;
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.calledTwice);
  });

  it("only calls onHitEnter when entering a hit", () => {
    callback = sinon.fake();
    hitbox1.addOnHitEnter(callback);

    // objects are not colliding
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.notCalled);

    // objects are colliding
    movingGameObject.transform.position.x = COLLIDING_X;
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.calledOnce);

    // objects are still colliding
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.calledOnce);

    // objects are no longer colliding
    movingGameObject.transform.position.x = NOT_COLLIDING_X;
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.calledOnce);
  });

  it("only calls onHitExit when leaving a hit", () => {
    callback = sinon.fake();
    hitbox1.addOnHitExit(callback);

    // objects are not colliding
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.notCalled);

    // objects are colliding
    movingGameObject.transform.position.x = COLLIDING_X;
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.notCalled);

    // objects are still colliding
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.notCalled);

    // objects are no longer colliding
    movingGameObject.transform.position.x = NOT_COLLIDING_X;
    movingGameObject.update(DELTA_TIME);
    assert.ok(callback.calledOnce);
  });
});