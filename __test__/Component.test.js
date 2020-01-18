const GameObject = require("../src/GameObject");
const Component = require("../src/Component");

describe("Component", () => {
  test("Components store a reference to their GameObject", () => {
    const gameObject = new GameObject();
    const component = new Component();
    gameObject.addComponent(component);

    expect(component.gameObject).toBe(gameObject);
  });
});
