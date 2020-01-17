const Composite = require("../src/composite");

describe("Composite", () => {
  test("addGameObject adds a game object", () => {
    const parent = new Composite();
    const child = new Composite();

    expect(!parent.gameObjects.includes(child));

    parent.addGameObject(child);
    expect(parent.gameObjects.includes(child));
  });

  test("removeGameObject removes a game object", () => {
    const parent = new Composite();
    const child = new Composite();

    expect(parent.gameObjects.includes(child));

    parent.removeGameObject(child);
    expect(!parent.gameObjects.includes(child));
  });
});
