import * as assert from "assert";
import * as testUtils from "../TestUtils";
import Circle from "../../src/shapes/Circle";
import ExcludingBoundary from "../../src/components/ExcludingBoundary";
import GameObject from "../../src/GameObject";

const RADIUS = 5;
const EXCLUDING_SHAPE = new Circle(RADIUS);
const EXCLUDED_SHAPE = new Circle(RADIUS);

const ELAPSED_TIME = 1;

describe("Excluding Boundary", () => {
  it("will not affect excluded GameObject", () => {
    const X = 0;
    const Y = 0;

    const X_OFFSET = RADIUS * 3;

    const excludedGameObject = new GameObject({
      x: X + X_OFFSET,
      y: Y,
      shape: EXCLUDED_SHAPE
    });
    const excludedGameObjects = [excludedGameObject.transform];

    const excludingGameObject = new GameObject({x: X, y: Y, shape: EXCLUDING_SHAPE});
    const excludingBoundary = new ExcludingBoundary(excludedGameObjects);
    excludingGameObject.addComponent(excludingBoundary);

    excludingGameObject.update(ELAPSED_TIME);

    
    testUtils.assertAlmostEqual(excludedGameObject.transform.x, X + X_OFFSET)
    testUtils.assertAlmostEqual(excludedGameObject.transform.y, Y);
  });

  it("will reposition breaching GameObject", () => {
    const X = 0;
    const Y = 0;

    const excludedGameObject = new GameObject({x: X, y: Y, shape: EXCLUDED_SHAPE});
    const excludedGameObjects = [excludedGameObject.transform];

    const excludingGameObject = new GameObject({x: X, y: Y, shape: EXCLUDING_SHAPE});
    const excludingBoundary = new ExcludingBoundary(excludedGameObjects);
    excludingGameObject.addComponent(excludingBoundary);

    excludingGameObject.update(ELAPSED_TIME);

    
    testUtils.assertAlmostEqual(excludedGameObject.transform.x, RADIUS * 2 + 1)
    testUtils.assertAlmostEqual(excludedGameObject.transform.y, Y);
  });
});
