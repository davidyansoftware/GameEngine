const Composite = require("../src/Composite");
const GameObject = require("../src/GameObject");

describe("Composite", () => {
  test("addGameObject adds a game object", () => {
    const parent = new Composite();
    const child = new GameObject();

    expect(!parent.gameObjects.includes(child));

    parent.addGameObject(child);
    expect(parent.gameObjects.includes(child));
  });

  test("removeGameObject removes a game object", () => {
    const parent = new Composite();
    const child = new GameObject();

    expect(parent.gameObjects.includes(child));

    parent.removeGameObject(child);
    expect(!parent.gameObjects.includes(child));
  });
});
