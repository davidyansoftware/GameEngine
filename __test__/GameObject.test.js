const GameObject = require("../src/GameObject");
const Component = require("../src/Component");

describe("GameObject", () => {
  test("GameObject constructor creates a Transform", () => {
    const defaultGameObject = new GameObject();
    expect(defaultGameObject.transform).toBeDefined();
  });

  test("addGameObject adds a game object", () => {
    const parent = new GameObject();
    const child = new GameObject();
    expect(!parent.gameObjects.includes(child));

    parent.addGameObject(child);
    expect(parent.gameObjects.includes(child));
  });

  test("addGameObject sets the parent", () => {
    const parent = new GameObject();
    const child = new GameObject();

    parent.addGameObject(child);
    expect(child.parent).toBe(parent);
  });

  test("removeGameObject removes a game object", () => {
    const parent = new GameObject();
    const child = new GameObject();
    expect(parent.gameObjects.includes(child));

    parent.removeGameObject(child);
    expect(!parent.gameObjects.includes(child));
  });

  test("addGameObject removes the object from the previous parent", () => {
    const parent1 = new GameObject();
    const parent2 = new GameObject();
    const child = new GameObject();

    parent1.addGameObject(child);
    parent2.addGameObject(child);

    expect(parent1.gameObjects).not.toContain(child);
    expect(parent2.gameObjects).toContain(child);
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
