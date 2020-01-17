const GameObject = require("../src/GameObject");
const Component = require("../src/Component");

describe("GameObject", () => {
  test("addComponent adds a component", () => {
    const gameObject = new GameObject();
    const component = new Component();

    expect(!gameObject.components.includes(component));

    gameObject.addComponent(component);
    expect(gameObject.components.includes(component));
  });

  test("removeComponent removes a component", () => {
    const gameObject = new GameObject();
    const component = new Component();

    gameObject.addComponent(component);
    expect(gameObject.components.includes(component));

    gameObject.removeComponent(component);
    expect(!gameObject.components.includes(component));
  });
});
