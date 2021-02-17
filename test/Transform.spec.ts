import * as assert from "assert";
import * as testUtils from "./TestUtils";
import GameObject from "../src/GameObject";

describe("Transform constructor", () => {
  it("is tied to its gameObject", () => {
    const gameObject = new GameObject();
    assert.equal(gameObject.transform.gameObject, gameObject);
  });

  it("references itself", () => {
    const gameObject = new GameObject();
    assert.equal(gameObject.transform, gameObject.transform.transform);
  });

  it("defaults to (0,0,0)", () => {
    const gameObject = new GameObject();
    assert.equal(gameObject.transform.x, 0);
    assert.equal(gameObject.transform.y, 0);
    assert.equal(gameObject.transform.rotation, 0);
  });

  it("getters match setters", () => {
    const X_VALUE = 1;
    const Y_VALUE = 2;
    const ROTATION = Math.PI / 2;
    const gameObject = new GameObject();

    gameObject.transform.x = X_VALUE;
    assert.equal(gameObject.transform.x, X_VALUE);

    gameObject.transform.y = Y_VALUE;
    assert.equal(gameObject.transform.y, Y_VALUE);

    gameObject.transform.rotation = ROTATION;
    assert.equal(gameObject.transform.rotation, ROTATION);
  });

  it("sets values", () => {
    const X_VALUE = 1;
    const Y_VALUE = 2;
    const ROTATION = Math.PI / 2;
    const gameObject = new GameObject({x: X_VALUE, y: Y_VALUE, rotation: ROTATION});
    assert.equal(gameObject.transform.x, X_VALUE);
    assert.equal(gameObject.transform.y, Y_VALUE);
    assert.equal(gameObject.transform.rotation, ROTATION);
  });
});

// position and rotation tests are separated so dirty flags do not interfere with eachother
describe("Transform absolute position", () => {
  it("includes parent's absolute position", () => {
    const GRAND_PARENT_X = 1;
    const GRAND_PARENT_Y = 2;
    const grandParent = new GameObject({x: GRAND_PARENT_X, y: GRAND_PARENT_Y});
    assert.equal(grandParent.transform.absoluteX, GRAND_PARENT_X);
    assert.equal(grandParent.transform.absoluteY, GRAND_PARENT_Y);

    const PARENT_X = 3;
    const PARENT_Y = 4;
    const parent = new GameObject({x: PARENT_X, y: PARENT_Y});
    grandParent.addGameObject(parent);
    assert.equal(parent.transform.absoluteX, GRAND_PARENT_X + PARENT_X);
    assert.equal(parent.transform.absoluteY, GRAND_PARENT_Y + PARENT_Y);

    const CHILD_X = 5;
    const CHILD_Y = 6;
    const child = new GameObject({x: CHILD_X, y: CHILD_Y});
    parent.addGameObject(child);
    assert.equal(child.transform.absoluteX, GRAND_PARENT_X + PARENT_X + CHILD_X);
    assert.equal(child.transform.absoluteY, GRAND_PARENT_Y + PARENT_Y + CHILD_Y);
  });

  it("is updated when its position changes", () => {
    const X_VALUE = 1;
    const Y_VALUE = 2;
    const gameObject = new GameObject({x: X_VALUE, y: Y_VALUE});

    const OFFSET_X = 3;
    const OFFSET_Y = 4;

    // test after each change to reset the dirty flag
    gameObject.transform.x += OFFSET_X;
    assert.equal(gameObject.transform.absoluteX, X_VALUE + OFFSET_X);

    gameObject.transform.y += OFFSET_Y;
    assert.equal(gameObject.transform.absoluteY, Y_VALUE + OFFSET_Y);
  });

  it("is updated when its parent's position changes", () => {
    const PARENT_X = 1;
    const PARENT_Y = 2;
    const parent = new GameObject({x: PARENT_X, y: PARENT_Y});

    const CHILD_X = 3;
    const CHILD_Y = 4;
    const child = new GameObject({x: CHILD_X, y: CHILD_Y});
    parent.addGameObject(child);

    const OFFSET_X = 5;
    const OFFSET_Y = 6;

    // test after each change to reset the dirty flag
    parent.transform.x += OFFSET_X;
    assert.equal(child.transform.absoluteX, PARENT_X + CHILD_X + OFFSET_X);

    parent.transform.y += OFFSET_Y;
    assert.equal(child.transform.absoluteY, PARENT_Y + CHILD_Y + OFFSET_Y);
  });

  it("updates position", () => {
    const PARENT_X = 1;
    const PARENT_Y = 2;
    const parent = new GameObject({x: PARENT_X, y: PARENT_Y});
    const child = new GameObject();
    parent.addGameObject(child);

    const CHILD_ABSOLUTE_X = 3;
    const CHILD_ABSOLUTE_Y = 4;

    child.transform.absoluteX = CHILD_ABSOLUTE_X;
    assert.equal(child.transform.x, CHILD_ABSOLUTE_X - PARENT_X);

    child.transform.absoluteY = CHILD_ABSOLUTE_Y;
    assert.equal(child.transform.y, CHILD_ABSOLUTE_Y - PARENT_Y);

    // ensure changing the child didn't change the parent's position
    assert.equal(parent.transform.x, PARENT_X);
    assert.equal(parent.transform.y, PARENT_Y);
    assert.equal(parent.transform.absoluteX, PARENT_X);
    assert.equal(parent.transform.absoluteY, PARENT_Y);
  });
});

describe("Transform absolute rotation", () => {
  it("includes parent's absolute rotation", () => {
    const GRAND_PARENT_ROTATION = Math.PI / 2;
    const grandParent = new GameObject({rotation: GRAND_PARENT_ROTATION});
    assert.equal(grandParent.transform.absoluteRotation, GRAND_PARENT_ROTATION);

    const PARENT_ROTATION = Math.PI / 4;
    const parent = new GameObject({rotation: PARENT_ROTATION});
    grandParent.addGameObject(parent);
    assert.equal(parent.transform.absoluteRotation, 
      GRAND_PARENT_ROTATION + PARENT_ROTATION
    );

    const CHILD_ROTATION = Math.PI / 8;
    const child = new GameObject({rotation: CHILD_ROTATION});
    parent.addGameObject(child);
    assert.equal(child.transform.absoluteRotation, 
      GRAND_PARENT_ROTATION + PARENT_ROTATION + CHILD_ROTATION
    );
  });

  it("is updated when its rotation changes", () => {
    const ROTATION = Math.PI / 2;
    const gameObject = new GameObject({rotation: ROTATION});

    const OFFSET_ROTATION = Math.PI / 4;
    gameObject.transform.rotation += OFFSET_ROTATION;
    assert.equal(gameObject.transform.absoluteRotation,
      ROTATION + OFFSET_ROTATION
    );
  });

  it("is updated when its parent's rotation changes", () => {
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject({rotation: PARENT_ROTATION});

    const CHILD_ROTATION = Math.PI / 4;
    const child = new GameObject({rotation: CHILD_ROTATION});
    parent.addGameObject(child);

    const OFFSET_ROTATION = Math.PI / 8;
    parent.transform.rotation += OFFSET_ROTATION;
    assert.equal(child.transform.absoluteRotation,
      PARENT_ROTATION + CHILD_ROTATION + OFFSET_ROTATION
    );
  });

  it("updates its own rotation", () => {
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject({rotation: PARENT_ROTATION});
    const child = new GameObject();
    parent.addGameObject(child);

    const CHILD_ABSOLUTE_ROTATION = Math.PI / 4;
    child.transform.absoluteRotation = CHILD_ABSOLUTE_ROTATION;

    assert.equal(child.transform.rotation,
      CHILD_ABSOLUTE_ROTATION - PARENT_ROTATION
    );

    // ensure changing the child didn't change the parent's position
    assert.equal(parent.transform.rotation, PARENT_ROTATION);
    assert.equal(parent.transform.absoluteRotation, PARENT_ROTATION);
  });
});

describe("Transform absolute position", () => {
  it("includes parent's rotation (Math.PI/2)", () => {
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject({rotation: PARENT_ROTATION});
    const CHILD_X = 1;
    const CHILD_Y = 2;
    const child = new GameObject({x: CHILD_X, y: CHILD_Y});
    parent.addGameObject(child);

    const ABSOLUTE_X = 2;
    const ABSOLUTE_Y = -1;
    testUtils.assertAlmostEqual(child.transform.absoluteX, ABSOLUTE_X);
    testUtils.assertAlmostEqual(child.transform.absoluteY, ABSOLUTE_Y);
  });

  it("includes parent's rotation (-Math.PI/2)", () => {
    const PARENT_ROTATION = -Math.PI / 2;
    const parent = new GameObject({rotation: PARENT_ROTATION});
    const CHILD_X = 1;
    const CHILD_Y = 2;
    const child = new GameObject({x: CHILD_X, y: CHILD_Y});
    parent.addGameObject(child);

    const ABSOLUTE_X = -2;
    const ABSOLUTE_Y = 1;
    testUtils.assertAlmostEqual(child.transform.absoluteX, ABSOLUTE_X);
    testUtils.assertAlmostEqual(child.transform.absoluteY, ABSOLUTE_Y);
  });

  it("includes parent's rotation (Math.PI)", () => {
    const PARENT_ROTATION = Math.PI;
    const parent = new GameObject({rotation: PARENT_ROTATION});
    const CHILD_X = 1;
    const CHILD_Y = 2;
    const child = new GameObject({x: CHILD_X, y: CHILD_Y});
    parent.addGameObject(child);

    const ABSOLUTE_X = -1;
    const ABSOLUTE_Y = -2;
    testUtils.assertAlmostEqual(child.transform.absoluteX, ABSOLUTE_X);
    testUtils.assertAlmostEqual(child.transform.absoluteY, ABSOLUTE_Y);
  });

  it("includes parent's rotation (Math.PI/2)", () => {
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject({rotation: PARENT_ROTATION});
    const child = new GameObject();
    parent.addGameObject(child);

    const ABSOLUTE_X = 1;
    child.transform.absoluteX = ABSOLUTE_X;
    const CHILD_Y = 1;
    testUtils.assertAlmostEqual(child.transform.x, 0);
    testUtils.assertAlmostEqual(child.transform.y, CHILD_Y);

    const ABSOLUTE_Y = 2;
    child.transform.absoluteY = ABSOLUTE_Y;
    const CHILD_X = -2;
    testUtils.assertAlmostEqual(child.transform.x, CHILD_X);
    testUtils.assertAlmostEqual(child.transform.y, CHILD_Y);
  });

  it("includes parent's rotation (-Math.PI/2)", () => {
    const PARENT_ROTATION = -Math.PI / 2;
    const parent = new GameObject({rotation: PARENT_ROTATION});
    const child = new GameObject();
    parent.addGameObject(child);

    const ABSOLUTE_X = 1;
    child.transform.absoluteX = ABSOLUTE_X;
    const CHILD_Y = -1;
    testUtils.assertAlmostEqual(child.transform.x, 0);
    testUtils.assertAlmostEqual(child.transform.y, CHILD_Y);

    const ABSOLUTE_Y = 2;
    child.transform.absoluteY = ABSOLUTE_Y;
    const CHILD_X = 2;
    testUtils.assertAlmostEqual(child.transform.x, CHILD_X);
    testUtils.assertAlmostEqual(child.transform.y, CHILD_Y);
  });

  it("includes parent's rotation (Math.PI)", () => {
    const PARENT_ROTATION = Math.PI;
    const parent = new GameObject({rotation: PARENT_ROTATION});
    const child = new GameObject();
    parent.addGameObject(child);

    const ABSOLUTE_X = 1;
    child.transform.absoluteX = ABSOLUTE_X;
    const CHILD_X = -1;
    testUtils.assertAlmostEqual(child.transform.x, CHILD_X);
    testUtils.assertAlmostEqual(child.transform.y, 0);

    const ABSOLUTE_Y = 2;
    child.transform.absoluteY = ABSOLUTE_Y;
    const CHILD_Y = -2;
    testUtils.assertAlmostEqual(child.transform.x, CHILD_X);
    testUtils.assertAlmostEqual(child.transform.y, CHILD_Y);
  });
});
