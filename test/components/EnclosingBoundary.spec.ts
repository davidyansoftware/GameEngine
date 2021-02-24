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

    const enclosedGameObject = new GameObject({x: X, y: Y, shape: ENCLOSED_SHAPE});
    const enclosedGameObjects = [enclosedGameObject.transform];

    const enclosingGameObject = new GameObject({x: X, y: Y, shape: ENCLOSING_SHAPE});
    const enclosingBoundary = new EnclosingBoundary(enclosedGameObjects);
    enclosingGameObject.addComponent(enclosingBoundary);

    enclosingGameObject.update(ELAPSED_TIME);

    assert.equal(enclosedGameObject.transform.position.x, X);
    assert.equal(enclosedGameObject.transform.position.y, Y);
  });

  it("will reposition breaching GameObject", () => {
    const X = 0;
    const Y = 0;

    const X_OFFSET = ENCLOSING_RADIUS * 2;

    const enclosedGameObject = new GameObject({
      x: X + X_OFFSET,
      y: Y,
      shape: ENCLOSED_SHAPE
    });
    const enclosedGameObjects = [enclosedGameObject.transform];

    const enclosingGameObject = new GameObject({x: X, y: Y, shape: ENCLOSING_SHAPE});
    const enclosingBoundary = new EnclosingBoundary(enclosedGameObjects);
    enclosingGameObject.addComponent(enclosingBoundary);

    enclosingGameObject.update(ELAPSED_TIME);

    testUtils.assertAlmostEqual(
        enclosedGameObject.transform.position.x,
        ENCLOSING_RADIUS - ENCLOSED_RADIUS - 1
    );
    testUtils.assertAlmostEqual(enclosedGameObject.transform.position.y, Y);
  });
});
