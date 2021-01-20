import * as assert from "assert";
import * as testUtils from "../TestUtils";
import Circle from "../../src/shapes/Circle";
import EnclosingBoundary from "../../src/components/EnclosingBoundary";
import GameObject from "../../src/GameObject";

const ENCLOSING_RADIUS = 10;
const ENCLOSING_SHAPE = new Circle(ENCLOSING_RADIUS);
const ENCLOSED_RADIUS = 5;
const ENCLOSED_SHAPE = new Circle(ENCLOSED_RADIUS);

const ELAPSED_TIME = 1;

describe("Enclosing Boundary", () => {
  it("will not affect enclosed GameObject", () => {
    const X = 0;
    const Y = 0;

    const enclosedGameObject = new GameObject(X, Y, 0, ENCLOSED_SHAPE);
    const enclosedGameObjects = [enclosedGameObject];

    const enclosingGameObject = new GameObject(X, Y, 0, ENCLOSING_SHAPE);
    const enclosingBoundary = new EnclosingBoundary(enclosedGameObjects);
    enclosingGameObject.addComponent(enclosingBoundary);

    enclosingGameObject.update(ELAPSED_TIME);

    assert.equal(enclosedGameObject.transform.x, X);
    assert.equal(enclosedGameObject.transform.y, Y);
  });

  it("will reposition breaching GameObject", () => {
    const X = 0;
    const Y = 0;

    const X_OFFSET = ENCLOSING_RADIUS * 2;

    const enclosedGameObject = new GameObject(
      X + X_OFFSET,
      Y,
      0,
      ENCLOSED_SHAPE
    );
    const enclosedGameObjects = [enclosedGameObject];

    const enclosingGameObject = new GameObject(X, Y, 0, ENCLOSING_SHAPE);
    const enclosingBoundary = new EnclosingBoundary(enclosedGameObjects);
    enclosingGameObject.addComponent(enclosingBoundary);

    enclosingGameObject.update(ELAPSED_TIME);

    assert.ok(
      testUtils.almostEqual(
        enclosedGameObject.transform.x,
        ENCLOSING_RADIUS - ENCLOSED_RADIUS - 1
      )
    );
    assert.ok(testUtils.almostEqual(enclosedGameObject.transform.y, Y));
  });
});
