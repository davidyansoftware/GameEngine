const GameObject = require("../src/GameObject");
const Transform = require("../src/Transform");
const Component = require("../src/Component");

describe("GameObject", () => {
  test("GameObject constructor stores Transform", () => {
    const defaultGameObject = new GameObject();
    expect(defaultGameObject.transform.x).toBe(0);
    expect(defaultGameObject.transform.y).toBe(0);

    const X_VALUE = 1;
    const Y_VALUE = 2;
    const transform = new Transform(X_VALUE, Y_VALUE);
    const gameObject = new GameObject(transform);
    expect(gameObject.transform).toBe(transform);
  });

  test("addGameObject adds a game object", () => {
    const parent = new GameObject();
    const child = new GameObject();

    expect(!parent.gameObjects.includes(child));

    parent.addGameObject(child);
    expect(parent.gameObjects.includes(child));
  });

  test("removeGameObject removes a game object", () => {
    const parent = new GameObject();
    const child = new GameObject();

    expect(parent.gameObjects.includes(child));

    parent.removeGameObject(child);
    expect(!parent.gameObjects.includes(child));
  });

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

  test("update will update children GameObjects", () => {
    const parent = new GameObject();
    const child1 = new GameObject();
    jest.spyOn(child1, "update");
    const child2 = new GameObject();
    jest.spyOn(child2, "update");
    const child1Child = new GameObject();
    jest.spyOn(child1Child, "update");

    parent.addGameObject(child1);
    parent.addGameObject(child2);
    child1.addGameObject(child1Child);

    expect(child1.update).not.toHaveBeenCalled();
    expect(child2.update).not.toHaveBeenCalled();
    expect(child1Child.update).not.toHaveBeenCalled();

    parent.update();
    expect(child1.update).toHaveBeenCalledTimes(1);
    expect(child2.update).toHaveBeenCalledTimes(1);
    expect(child1Child.update).toHaveBeenCalledTimes(1);
  });

  test("update will update components", () => {
    const gameObject = new GameObject();
    const component = new Component();
    jest.spyOn(component, "update");
    gameObject.addComponent(component);

    expect(component.update).not.toHaveBeenCalled();

    gameObject.update();
    expect(component.update).toHaveBeenCalledTimes(1);
  });
});
