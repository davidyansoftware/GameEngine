const Canvas = require("canvas");
const GameObject = require("../src/GameObject");
const Component = require("../src/Component");

describe("GameObject", () => {
  test("GameObject constructor creates a Transform", () => {
    const defaultGameObject = new GameObject();
    expect(defaultGameObject.transform).toBeDefined();
  });
});

describe("GameObject composite", () => {
  test("addGameObject adds a game object", () => {
    const parent = new GameObject();
    const child = new GameObject();
    expect(parent.gameObjects).not.toContain(child);

    parent.addGameObject(child);
    expect(parent.gameObjects).toContain(child);
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
    parent.addGameObject(child);

    parent.removeGameObject(child);
    expect(parent.gameObjects).not.toContain(child);
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

  test("update will update children GameObjects", () => {
    const parent = new GameObject();
    const child = new GameObject();
    jest.spyOn(child, "update");

    parent.addGameObject(child);
    expect(child.update).not.toHaveBeenCalled();

    parent.update();
    expect(child.update).toHaveBeenCalledTimes(1);
  });

  test("update will pass timestamp to children GameObject updates", () => {
    const parent = new GameObject();
    const child = new GameObject();
    jest.spyOn(child, "update");
    parent.addGameObject(child);

    const TIMESTAMP = 12345;
    parent.update(TIMESTAMP);
    expect(child.update).toHaveBeenLastCalledWith(TIMESTAMP);
  });

  test("render will render children GameObject", () => {
    const parent = new GameObject();
    const child = new GameObject();
    jest.spyOn(child, "render");

    parent.addGameObject(child);
    expect(child.render).not.toHaveBeenCalled();

    parent.render();
    expect(child.render).toHaveBeenCalledTimes(1);
  });

  test("render will pass context to children GameObject updates", () => {
    const parent = new GameObject();
    const child = new GameObject();
    jest.spyOn(child, "render");
    parent.addGameObject(child);

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    parent.render(ctx);
    expect(child.render).toHaveBeenLastCalledWith(ctx);
  });
});

describe("GameObject components", () => {
  test("addComponent adds a component", () => {
    const gameObject = new GameObject();
    const component = new Component();
    expect(gameObject.components).not.toContain(component);

    gameObject.addComponent(component);
    expect(gameObject.components).toContain(component);
  });

  test("removeComponent removes a component", () => {
    const gameObject = new GameObject();
    const component = new Component();
    gameObject.addComponent(component);

    gameObject.removeComponent(component);
    expect(gameObject.components).not.toContain(component);
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

  test("update will pass timestamp to component updates", () => {
    const gameObject = new GameObject();
    const component = new Component();
    jest.spyOn(component, "update");
    gameObject.addComponent(component);

    const TIMESTAMP = 12345;
    gameObject.update(TIMESTAMP);
    expect(component.update).toHaveBeenLastCalledWith(TIMESTAMP);
  });

  test("render will render Components", () => {
    const gameObject = new GameObject();
    const component = new Component();

    jest.spyOn(component, "render");
    gameObject.addComponent(component);
    expect(component.render).not.toHaveBeenCalled();

    gameObject.render();
    expect(component.render).toHaveBeenCalledTimes(1);
  });

  test("render will pass context to Component renders", () => {
    const gameObject = new GameObject();
    const component = new Component();
    jest.spyOn(component, "render");
    gameObject.addComponent(component);

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    gameObject.render(ctx);
    expect(component.render).toHaveBeenLastCalledWith(ctx);
  });
});
