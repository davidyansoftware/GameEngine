//const Canvas = require("canvas");
import Canvas from "canvas";
import GameObject from "../src/GameObject";
import Component from "../src/GameObject";

describe("GameObject", () => {
  test("GameObject can reference itself", () => {
    const gameObject = new GameObject();
    expect(gameObject.gameObject).toBe(gameObject);
  });

  test("GameObject can reference it's Transform", () => {
    const gameObject = new GameObject();
    expect(gameObject.transform).toBe(gameObject._transform);
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

  test("addGameObject can maintain the absolute position", () => {
    const PARENT1_X = 1;
    const PARENT1_Y = 2;
    const parent1 = new GameObject(PARENT1_X, PARENT1_Y);
    const PARENT2_X = 3;
    const PARENT2_Y = 4;
    const parent2 = new GameObject(PARENT2_X, PARENT2_Y);
    const CHILD_X = 5;
    const CHILD_Y = 6;
    const child = new GameObject(CHILD_X, CHILD_Y);

    parent1.addGameObject(child);
    parent2.addGameObject(child, true);
    expect(child.transform.absoluteX).toBeCloseTo(PARENT1_X + CHILD_X);
    expect(child.transform.absoluteY).toBeCloseTo(PARENT1_Y + CHILD_Y);
  });

  test("addGameObject can maintain the absolute rotation", () => {
    const PARENT1_ROTATION = Math.PI / 2;
    const parent1 = new GameObject(0, 0, PARENT1_ROTATION);
    const PARENT2_ROTATION = Math.PI / 4;
    const parent2 = new GameObject(0, 0, PARENT2_ROTATION);
    const CHILD_ROTATION = Math.PI / 8;
    const child = new GameObject(0, 0, CHILD_ROTATION);

    parent1.addGameObject(child);
    parent2.addGameObject(child, false, true);
    expect(child.transform.absoluteRotation).toBeCloseTo(
      PARENT1_ROTATION + CHILD_ROTATION
    );
  });

  test("update will update children GameObjects", () => {
    const parent = new GameObject();
    const child = new GameObject();
    jest.spyOn(child, "update");

    parent.addGameObject(child);
    expect(child.update).not.toHaveBeenCalled();

    const TIMESTAMP = 12345;
    parent.update(TIMESTAMP);
    expect(child.update).toHaveBeenCalledTimes(1);
    expect(child.update).toHaveBeenLastCalledWith(TIMESTAMP);
  });

  test("render will render children GameObject", () => {
    const parent = new GameObject();
    const child = new GameObject();
    jest.spyOn(child, "render");

    parent.addGameObject(child);
    expect(child.render).not.toHaveBeenCalled();

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    parent.render(ctx);
    expect(child.render).toHaveBeenCalledTimes(1);
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

    const TIMESTAMP = 12345;
    gameObject.update(TIMESTAMP);
    expect(component.update).toHaveBeenCalledTimes(1);
    expect(component.update).toHaveBeenLastCalledWith(TIMESTAMP);
  });

  test("render will render Components", () => {
    const gameObject = new GameObject();
    const component = new Component();

    jest.spyOn(component, "render");
    gameObject.addComponent(component);
    expect(component.render).not.toHaveBeenCalled();

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    gameObject.render(ctx);
    expect(component.render).toHaveBeenCalledTimes(1);
    expect(component.render).toHaveBeenLastCalledWith(ctx);
  });
});

describe("GameObject render", () => {
  test("render will restore the state of the context", () => {
    const X_VALUE = 100;
    const Y_VALUE = 200;
    const ROTATION = Math.PI / 4;
    const gameObject = new GameObject(X_VALUE, Y_VALUE, ROTATION);

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    const beforeMatrix = ctx.currentTransform;

    gameObject.render(ctx);

    const afterMatrix = ctx.currentTransform;
    expect(afterMatrix).toEqual(beforeMatrix);
  });

  test("render will not translate canvas based on Transform", () => {
    const X_VALUE = 100;
    const Y_VALUE = 200;
    const ROTATION = Math.PI / 2;
    const gameObject = new GameObject(X_VALUE, Y_VALUE, ROTATION);

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    jest.spyOn(ctx, "translate");
    jest.spyOn(ctx, "rotate");

    gameObject.render(ctx);
    expect(ctx.translate).not.toHaveBeenCalled();
    expect(ctx.rotate).not.toHaveBeenCalled();
  });

  test("render will translate canvas based on child GameObject Transforms", () => {
    const PARENT_X = 100;
    const PARENT_Y = 200;
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject(PARENT_X, PARENT_Y, PARENT_ROTATION);

    const CHILD1_X = 300;
    const CHILD1_Y = 400;
    const CHILD1_ROTATION = Math.PI / 4;
    const child1 = new GameObject(CHILD1_X, CHILD1_Y, CHILD1_ROTATION);
    parent.addGameObject(child1);

    const CHILD2_X = 500;
    const CHILD2_Y = 600;
    const CHILD2_ROTATION = Math.PI / 8;
    const child2 = new GameObject(CHILD2_X, CHILD2_Y, CHILD2_ROTATION);
    parent.addGameObject(child2);

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    jest.spyOn(ctx, "translate");
    jest.spyOn(ctx, "rotate");

    parent.render(ctx);
    expect(ctx.translate).toHaveBeenCalledTimes(2);
    expect(ctx.translate).toHaveBeenNthCalledWith(1, CHILD1_X, -CHILD1_Y);
    expect(ctx.translate).toHaveBeenNthCalledWith(2, CHILD2_X, -CHILD2_Y);
    expect(ctx.rotate).toHaveBeenCalledTimes(2);
    expect(ctx.rotate).toHaveBeenNthCalledWith(1, CHILD1_ROTATION);
    expect(ctx.rotate).toHaveBeenNthCalledWith(2, CHILD2_ROTATION);
  });
});

describe("GameObject destroy", () => {
  test("Destroy removes GameObject from parent", () => {
    const parent = new GameObject();
    const child = new GameObject();
    parent.addGameObject(child);

    child.destroy();
    parent.update();

    expect(parent.gameObjects).not.toContain(child);
  });

  test("Destroy waits for an update before destroying", () => {
    const parent = new GameObject();
    const child = new GameObject();
    parent.addGameObject(child);

    child.destroy();

    expect(parent.gameObjects).toContain(child);
  });
});
