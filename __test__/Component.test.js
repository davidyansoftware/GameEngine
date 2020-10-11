import GameObject from "../src/GameObject";
import Component from "../src/Component";

describe("Component", () => {
  test("Components reference the GameObject they're attached to", () => {
    const component = new Component();
    expect(component.gameObject).toBeNull();

    const gameObject = new GameObject();
    gameObject.addComponent(component);
    expect(component.gameObject).toBe(gameObject);
  });

  test("Components reference the Transform they're attached to", () => {
    const component = new Component();
    expect(component.transform).toBeNull();

    const gameObject = new GameObject();
    gameObject.addComponent(component);
    expect(component.transform).toBe(gameObject.transform);
  });
});
