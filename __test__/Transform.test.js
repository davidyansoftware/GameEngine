const GameObject = require("../src/GameObject");

describe("Transform", () => {
  test("Transform constructor defaults to (0,0)", () => {
    const defaultGameObject = new GameObject();
    expect(defaultGameObject.transform.x).toBe(0);
    expect(defaultGameObject.transform.y).toBe(0);
  });

  test("Transform constructor sets x and y coordinates", () => {
    const X_VALUE = 1;
    const Y_VALUE = 2;
    const gameObject = new GameObject(X_VALUE, Y_VALUE);
    expect(gameObject.transform.x).toBe(X_VALUE);
    expect(gameObject.transform.y).toBe(Y_VALUE);
  });

  test("GameObject is tied to its Tranform", () => {
    const gameObject = new GameObject();
    expect(gameObject.transform.gameObject).toBe(gameObject);
  });

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
    const PARENT_X = 1;
    const PARENT_Y = 2;
    const parent = new GameObject(PARENT_X, PARENT_Y);

    const CHILD_X = 3;
    const CHILD_Y = 4;
    const child = new GameObject(CHILD_X, CHILD_Y);

    parent.addGameObject(child);
    const OFFSET = 1;
    parent.transform.x += OFFSET;
    parent.transform.y += OFFSET;
    expect(parent.transform.absoluteX).toBe(PARENT_X + OFFSET);
    expect(parent.transform.absoluteY).toBe(PARENT_Y + OFFSET);
  });
});
