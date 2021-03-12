import * as assert from "assert";
import * as sinon from "sinon";
import Circle from "../../src/shapes/Circle";
import Hitbox from "../../src/components/Hitbox";
import GameObject from "../../src/GameObject";

const Y = 0;
const RADIUS = 5;
const DELTA_TIME = 1;

describe("Non-colliding Hitboxes", () => {
  const NOT_COLLIDING_X_1 = Number.NEGATIVE_INFINITY;
  const NOT_COLLIDING_X_2 = Number.POSITIVE_INFINITY;

  let notColliding1: Hitbox;
  let notColliding2: Hitbox;

  let gameObject1: GameObject;
  let gameObject2: GameObject;

  beforeEach(() => {
    const circle = new Circle(RADIUS);

    const hurtboxes: Array<Hitbox> = [];
    notColliding1 = new Hitbox(hurtboxes);
    notColliding2 = new Hitbox();
    hurtboxes.push(notColliding2);

    gameObject1 = new GameObject({x: NOT_COLLIDING_X_1, y: Y, shape: circle});
    gameObject1.addComponent(notColliding1);
    gameObject2 = new GameObject({x: NOT_COLLIDING_X_2, y: Y, shape: circle});
    gameObject2.addComponent(notColliding2);
  });

  it("doesn't call callback", () => {
    const callback = sinon.fake();
    notColliding1.addOnHit(callback);

    gameObject1.update(DELTA_TIME);

    assert.ok(callback.notCalled);
  });
});

describe("Colliding Hitboxes", () => {
  const COLLIDING_X = 0;

  const circle = new Circle(RADIUS);

  let colliding1: Hitbox;
  let colliding2: Hitbox;

  let gameObject1: GameObject;
  let gameObject2: GameObject;

  beforeEach(() => {
    const hurtboxes: Array<Hitbox> = [];
    colliding1 = new Hitbox(hurtboxes);
    colliding2 = new Hitbox();
    hurtboxes.push(colliding2);

    gameObject1 = new GameObject({x: COLLIDING_X, y: Y, shape: circle});
    gameObject1.addComponent(colliding1);
    gameObject2 = new GameObject({x: COLLIDING_X, y: Y, shape: circle});
    gameObject2.addComponent(colliding2);
  });

  it("calls callback", () => {
    const callback = sinon.fake();
    colliding1.addOnHit(callback);

    gameObject1.update(DELTA_TIME);

    assert.ok(callback.calledOnce);
  });
});
