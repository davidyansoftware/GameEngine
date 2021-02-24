import * as assert from "assert";
import GameObject from "../../src/GameObject";
import Physics from "../../src/components/Physics";

const X: number = 100;
const Y: number = 200;

const ELAPSED_TIME = 1;

describe("Physics", () => {
  it("generates Physics", () => {
    const physics: Physics = new Physics(X, Y);

    assert.equal(physics.x, X);
    assert.equal(physics.y, Y);
  });

  it("updates position on update", () => {
    const gameObject: GameObject = new GameObject();
    const physics: Physics = new Physics(X, Y);
    gameObject.addComponent(physics);

    gameObject.update(ELAPSED_TIME);

    assert.equal(gameObject.transform.position.x, X * ELAPSED_TIME);
    assert.equal(gameObject.transform.position.y, Y * ELAPSED_TIME);
  });
});
