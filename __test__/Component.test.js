const GameObject = require("../src/GameObject");
const Component = require("../src/Component");

describe("Component", () => {
  test("Components store a reference to their GameObject", () => {
    const gameObject = new GameObject();
    const component = new Component();
    expect(component.gameObject).not.toBeDefined();

    gameObject.addComponent(component);
    expect(component.gameObject).toBe(gameObject);
  });

  test("Components are updated when their GameObject is updated", () => {
    const gameObject = new GameObject();
    const component = new Component();
    gameObject.addComponent(component);
    jest.spyOn(component, "update");

    gameObject.update();
    expect(component.update).toHaveBeenCalledTimes(1);

    gameObject.update();
    expect(component.update).toHaveBeenCalledTimes(2);
  });
});
