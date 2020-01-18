const GameObject = require("../src/GameObject");

describe("Transform", () => {
  test("Transform defaults to (0,0)", () => {
    const defaultGameObject = new GameObject();
    expect(defaultGameObject.transform.x).toBe(0);
    expect(defaultGameObject.transform.y).toBe(0);

    const X_VALUE = 1;
    const Y_VALUE = 2;
    const gameObject = new GameObject(X_VALUE, Y_VALUE);
    expect(gameObject.transform.x).toBe(X_VALUE);
    expect(gameObject.transform.y).toBe(Y_VALUE);
  });

  test("GameObject is tied to its tranform", () => {
    const gameObject = new GameObject();
    expect(gameObject.transform.gameObject).toBe(gameObject);
  });
});
