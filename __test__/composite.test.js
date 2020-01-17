const Composite = require("../src/composite");

describe("Composite", () => {
  test("addGameObject", () => {
    const parent = new Composite();
    const child = new Composite();

    expect(!parent.gameObjects.includes(child));

    parent.addGameObject(child);
    expect(parent.gameObjects.includes(child));
  });
});
