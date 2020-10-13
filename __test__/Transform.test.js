import GameObject from "../src/GameObject";

describe("Transform constructor", () => {
  test("GameObject is tied to its Tranform", () => {
    const gameObject = new GameObject();
    expect(gameObject.transform.gameObject).toBe(gameObject);
  });

  test("Transform references itself", () => {
    const gameObject = new GameObject();
    expect(gameObject.transform.transform).toBe(
      gameObject.transform._gameObject.transform
    );
  });

  test("Transform constructor defaults to (0,0,0)", () => {
    const gameObject = new GameObject();
    expect(gameObject.transform.x).toBe(0);
    expect(gameObject.transform.y).toBe(0);
    expect(gameObject.transform.rotation).toBe(0);
  });

  test("Transform getters match setters", () => {
    const X_VALUE = 1;
    const Y_VALUE = 2;
    const ROTATION = Math.PI / 2;
    const gameObject = new GameObject();

    gameObject.transform.x = X_VALUE;
    expect(gameObject.transform.x).toBe(X_VALUE);

    gameObject.transform.y = Y_VALUE;
    expect(gameObject.transform.y).toBe(Y_VALUE);

    gameObject.transform.rotation = ROTATION;
    expect(gameObject.transform.rotation).toBe(ROTATION);
  });

  test("Transform constructor sets values", () => {
    const X_VALUE = 1;
    const Y_VALUE = 2;
    const ROTATION = Math.PI / 2;
    const gameObject = new GameObject(X_VALUE, Y_VALUE, ROTATION);
    expect(gameObject.transform.x).toBe(X_VALUE);
    expect(gameObject.transform.y).toBe(Y_VALUE);
    expect(gameObject.transform.rotation).toBe(ROTATION);
  });
});

// position and rotation tests are separated so dirty flags do not interfere with eachother
describe("Transform position", () => {
  test("Transform absolute position includes parent's absolute position", () => {
    const GRAND_PARENT_X = 1;
    const GRAND_PARENT_Y = 2;
    const grandParent = new GameObject(GRAND_PARENT_X, GRAND_PARENT_Y);
    expect(grandParent.transform.absoluteX).toBe(GRAND_PARENT_X);
    expect(grandParent.transform.absoluteY).toBe(GRAND_PARENT_Y);

    const PARENT_X = 3;
    const PARENT_Y = 4;
    const parent = new GameObject(PARENT_X, PARENT_Y);
    grandParent.addGameObject(parent);
    expect(parent.transform.absoluteX).toBe(GRAND_PARENT_X + PARENT_X);
    expect(parent.transform.absoluteY).toBe(GRAND_PARENT_Y + PARENT_Y);

    const CHILD_X = 5;
    const CHILD_Y = 6;
    const child = new GameObject(CHILD_X, CHILD_Y);
    parent.addGameObject(child);
    expect(child.transform.absoluteX).toBe(GRAND_PARENT_X + PARENT_X + CHILD_X);
    expect(child.transform.absoluteY).toBe(GRAND_PARENT_Y + PARENT_Y + CHILD_Y);
  });

  test("Transform absolute position is updated when its position changes", () => {
    const X_VALUE = 1;
    const Y_VALUE = 2;
    const gameObject = new GameObject(X_VALUE, Y_VALUE);

    const OFFSET_X = 3;
    const OFFSET_Y = 4;

    // test after each change to reset the dirty flag
    gameObject.transform.x += OFFSET_X;
    expect(gameObject.transform.absoluteX).toBe(X_VALUE + OFFSET_X);

    gameObject.transform.y += OFFSET_Y;
    expect(gameObject.transform.absoluteY).toBe(Y_VALUE + OFFSET_Y);
  });

  test("Transform absolute position is updated when its parent's position changes", () => {
    const PARENT_X = 1;
    const PARENT_Y = 2;
    const parent = new GameObject(PARENT_X, PARENT_Y);

    const CHILD_X = 3;
    const CHILD_Y = 4;
    const child = new GameObject(CHILD_X, CHILD_Y);
    parent.addGameObject(child);

    const OFFSET_X = 5;
    const OFFSET_Y = 6;

    // test after each change to reset the dirty flag
    parent.transform.x += OFFSET_X;
    expect(child.transform.absoluteX).toBe(PARENT_X + CHILD_X + OFFSET_X);

    parent.transform.y += OFFSET_Y;
    expect(child.transform.absoluteY).toBe(PARENT_Y + CHILD_Y + OFFSET_Y);
  });

  test("Transform set absolute position updates its own position", () => {
    const PARENT_X = 1;
    const PARENT_Y = 2;
    const parent = new GameObject(PARENT_X, PARENT_Y);
    const child = new GameObject();
    parent.addGameObject(child);

    const CHILD_ABSOLUTE_X = 3;
    const CHILD_ABSOLUTE_Y = 4;

    child.transform.absoluteX = CHILD_ABSOLUTE_X;
    expect(child.transform.x).toBe(CHILD_ABSOLUTE_X - PARENT_X);

    child.transform.absoluteY = CHILD_ABSOLUTE_Y;
    expect(child.transform.y).toBe(CHILD_ABSOLUTE_Y - PARENT_Y);

    // ensure changing the child didn't change the parent's position
    expect(parent.transform.x).toBe(PARENT_X);
    expect(parent.transform.y).toBe(PARENT_Y);
    expect(parent.transform.absoluteX).toBe(PARENT_X);
    expect(parent.transform.absoluteY).toBe(PARENT_Y);
  });
});

describe("Transform rotation", () => {
  test("Transform absolute rotation includes parent's absolute rotation", () => {
    const GRAND_PARENT_ROTATION = Math.PI / 2;
    const grandParent = new GameObject(0, 0, GRAND_PARENT_ROTATION);
    expect(grandParent.transform.absoluteRotation).toBe(GRAND_PARENT_ROTATION);

    const PARENT_ROTATION = Math.PI / 4;
    const parent = new GameObject(0, 0, PARENT_ROTATION);
    grandParent.addGameObject(parent);
    expect(parent.transform.absoluteRotation).toBe(
      GRAND_PARENT_ROTATION + PARENT_ROTATION
    );

    const CHILD_ROTATION = Math.PI / 8;
    const child = new GameObject(0, 0, CHILD_ROTATION);
    parent.addGameObject(child);
    expect(child.transform.absoluteRotation).toBe(
      GRAND_PARENT_ROTATION + PARENT_ROTATION + CHILD_ROTATION
    );
  });

  test("Transform absolute rotation is updated when its rotation changes", () => {
    const ROTATION = Math.PI / 2;
    const gameObject = new GameObject(0, 0, ROTATION);

    const OFFSET_ROTATION = Math.PI / 4;
    gameObject.transform.rotation += OFFSET_ROTATION;
    expect(gameObject.transform.absoluteRotation).toBe(
      ROTATION + OFFSET_ROTATION
    );
  });

  test("Transform absolute rotation is updated when its parent's rotation changes", () => {
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject(0, 0, PARENT_ROTATION);

    const CHILD_ROTATION = Math.PI / 4;
    const child = new GameObject(0, 0, CHILD_ROTATION);
    parent.addGameObject(child);

    const OFFSET_ROTATION = Math.PI / 8;
    parent.transform.rotation += OFFSET_ROTATION;
    expect(child.transform.absoluteRotation).toBe(
      PARENT_ROTATION + CHILD_ROTATION + OFFSET_ROTATION
    );
  });

  test("Transform set absolute rotation updates its own rotation", () => {
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject(0, 0, PARENT_ROTATION);
    const child = new GameObject();
    parent.addGameObject(child);

    const CHILD_ABSOLUTE_ROTATION = Math.PI / 4;
    child.transform.absoluteRotation = CHILD_ABSOLUTE_ROTATION;

    expect(child.transform.rotation).toBe(
      CHILD_ABSOLUTE_ROTATION - PARENT_ROTATION
    );

    // ensure changing the child didn't change the parent's position
    expect(parent.transform.rotation).toBe(PARENT_ROTATION);
    expect(parent.transform.absoluteRotation).toBe(PARENT_ROTATION);
  });
});

describe("Transform position and rotation", () => {
  test("absolute position includes parent's rotation (Math.PI/2)", () => {
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject(0, 0, PARENT_ROTATION);
    const CHILD_X = 1;
    const CHILD_Y = 2;
    const child = new GameObject(CHILD_X, CHILD_Y);
    parent.addGameObject(child);

    const ABSOLUTE_X = 2;
    const ABSOLUTE_Y = -1;
    expect(child.transform.absoluteX).toBeCloseTo(ABSOLUTE_X);
    expect(child.transform.absoluteY).toBeCloseTo(ABSOLUTE_Y);
  });

  test("absolute position includes parent's rotation (-Math.PI/2)", () => {
    const PARENT_ROTATION = -Math.PI / 2;
    const parent = new GameObject(0, 0, PARENT_ROTATION);
    const CHILD_X = 1;
    const CHILD_Y = 2;
    const child = new GameObject(CHILD_X, CHILD_Y);
    parent.addGameObject(child);

    const ABSOLUTE_X = -2;
    const ABSOLUTE_Y = 1;
    expect(child.transform.absoluteX).toBeCloseTo(ABSOLUTE_X);
    expect(child.transform.absoluteY).toBeCloseTo(ABSOLUTE_Y);
  });

  test("absolute position includes parent's rotation (Math.PI)", () => {
    const PARENT_ROTATION = Math.PI;
    const parent = new GameObject(0, 0, PARENT_ROTATION);
    const CHILD_X = 1;
    const CHILD_Y = 2;
    const child = new GameObject(CHILD_X, CHILD_Y);
    parent.addGameObject(child);

    const ABSOLUTE_X = -1;
    const ABSOLUTE_Y = -2;
    expect(child.transform.absoluteX).toBeCloseTo(ABSOLUTE_X);
    expect(child.transform.absoluteY).toBeCloseTo(ABSOLUTE_Y);
  });

  test("setting absolute position includes parent's rotation (Math.PI/2)", () => {
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject(0, 0, PARENT_ROTATION);
    const child = new GameObject();
    parent.addGameObject(child);

    const ABSOLUTE_X = 1;
    child.transform.absoluteX = ABSOLUTE_X;
    const CHILD_Y = 1;
    expect(child.transform.x).toBeCloseTo(0);
    expect(child.transform.y).toBeCloseTo(CHILD_Y);

    const ABSOLUTE_Y = 2;
    child.transform.absoluteY = ABSOLUTE_Y;
    const CHILD_X = -2;
    expect(child.transform.x).toBeCloseTo(CHILD_X);
    expect(child.transform.y).toBeCloseTo(CHILD_Y);
  });

  test("setting absolute position includes parent's rotation (-Math.PI/2)", () => {
    const PARENT_ROTATION = -Math.PI / 2;
    const parent = new GameObject(0, 0, PARENT_ROTATION);
    const child = new GameObject();
    parent.addGameObject(child);

    const ABSOLUTE_X = 1;
    child.transform.absoluteX = ABSOLUTE_X;
    const CHILD_Y = -1;
    expect(child.transform.x).toBeCloseTo(0);
    expect(child.transform.y).toBeCloseTo(CHILD_Y);

    const ABSOLUTE_Y = 2;
    child.transform.absoluteY = ABSOLUTE_Y;
    const CHILD_X = 2;
    expect(child.transform.x).toBeCloseTo(CHILD_X);
    expect(child.transform.y).toBeCloseTo(CHILD_Y);
  });

  test("setting absolute position includes parent's rotation (Math.PI)", () => {
    const PARENT_ROTATION = Math.PI;
    const parent = new GameObject(0, 0, PARENT_ROTATION);
    const child = new GameObject();
    parent.addGameObject(child);

    const ABSOLUTE_X = 1;
    child.transform.absoluteX = ABSOLUTE_X;
    const CHILD_X = -1;
    expect(child.transform.x).toBeCloseTo(CHILD_X);
    expect(child.transform.y).toBeCloseTo(0);

    const ABSOLUTE_Y = 2;
    child.transform.absoluteY = ABSOLUTE_Y;
    const CHILD_Y = -2;
    expect(child.transform.x).toBeCloseTo(CHILD_X);
    expect(child.transform.y).toBeCloseTo(CHILD_Y);
  });
});
