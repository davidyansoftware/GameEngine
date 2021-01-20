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

    const excludedGameObject = new GameObject(
      X + X_OFFSET,
      Y,
      0,
      EXCLUDED_SHAPE
    );
    const excludedGameObjects = [excludedGameObject];

    const excludingGameObject = new GameObject(X, Y, 0, EXCLUDING_SHAPE);
    const excludingBoundary = new ExcludingBoundary(excludedGameObjects);
    excludingGameObject.addComponent(excludingBoundary);

    excludingGameObject.update(ELAPSED_TIME);

    assert.ok(
      testUtils.almostEqual(excludedGameObject.transform.x, X + X_OFFSET)
    );
    assert.ok(testUtils.almostEqual(excludedGameObject.transform.y, Y));
  });

  it("will reposition breaching GameObject", () => {
    const X = 0;
    const Y = 0;

    const excludedGameObject = new GameObject(X, Y, 0, EXCLUDED_SHAPE);
    const excludedGameObjects = [excludedGameObject];

    const excludingGameObject = new GameObject(X, Y, 0, EXCLUDING_SHAPE);
    const excludingBoundary = new ExcludingBoundary(excludedGameObjects);
    excludingGameObject.addComponent(excludingBoundary);

    excludingGameObject.update(ELAPSED_TIME);

    assert.ok(
      testUtils.almostEqual(excludedGameObject.transform.x, RADIUS * 2 + 1)
    );
    assert.ok(testUtils.almostEqual(excludedGameObject.transform.y, Y));
  });
});
