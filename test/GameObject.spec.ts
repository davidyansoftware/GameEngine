import * as assert from "assert";
import should from "should";
import * as sinon from "sinon";
import * as testUtils from "./TestUtils";
import Canvas from "canvas";
import GameObject from "../src/GameObject";
import Component from "../src/GameObject";

describe("GameObject", () => {
  it("can reference itself", () => {
    const gameObject = new GameObject();
    assert.equal(gameObject.gameObject, gameObject);
  });
});

describe("GameObject composite", () => {
  it("adds a game object", () => {
    const parent = new GameObject();
    const child = new GameObject();
    should(parent.gameObjects).not.containEql(child);

    parent.addGameObject(child);
    should(parent.gameObjects).containEql(child);
  });

  it("sets the parent", () => {
    const parent = new GameObject();
    const child = new GameObject();

    parent.addGameObject(child);
    assert.equal(child.parent, parent);
  });

  it("removes a game object", () => {
    const parent = new GameObject();
    const child = new GameObject();
    parent.addGameObject(child);

    parent.removeGameObject(child);
    should(parent.gameObjects).not.containEql(child);
  });

  it("removes the object from the previous parent", () => {
    const parent1 = new GameObject();
    const parent2 = new GameObject();
    const child = new GameObject();

    parent1.addGameObject(child);
    parent2.addGameObject(child);

    should(parent1.gameObjects).not.containEql(child);
    should(parent2.gameObjects).containEql(child);
  });

  it("can maintain the absolute position", () => {
    const PARENT1_X = 1;
    const PARENT1_Y = 2;
    const parent1 = new GameObject({x: PARENT1_X, y: PARENT1_Y});
    const PARENT2_X = 3;
    const PARENT2_Y = 4;
    const parent2 = new GameObject({x: PARENT2_X, y: PARENT2_Y});
    const CHILD_X = 5;
    const CHILD_Y = 6;
    const child = new GameObject({x: CHILD_X, y: CHILD_Y});

    parent1.addGameObject(child);
    parent2.addGameObject(child, true);
    testUtils.assertAlmostEqual(child.transform.position.absoluteX, PARENT1_X + CHILD_X);
    testUtils.assertAlmostEqual(child.transform.position.absoluteY, PARENT1_Y + CHILD_Y);
  });

  it("can maintain the absolute rotation", () => {
    const PARENT1_ROTATION = Math.PI / 2;
    const parent1 = new GameObject({rotation: PARENT1_ROTATION});
    const PARENT2_ROTATION = Math.PI / 4;
    const parent2 = new GameObject({rotation: PARENT2_ROTATION});
    const CHILD_ROTATION = Math.PI / 8;
    const child = new GameObject({rotation: CHILD_ROTATION});

    parent1.addGameObject(child);
    parent2.addGameObject(child, false, true);
    testUtils.assertAlmostEqual(
      child.transform.position.absoluteRotation,
      PARENT1_ROTATION + CHILD_ROTATION
    );
  });

  it("will update children GameObjects", () => {
    const parent = new GameObject();
    const child = new GameObject();
    const childSpy = sinon.spy(child, "update");

    parent.addGameObject(child);
    assert.ok(childSpy.notCalled);

    const TIMESTAMP = 12345;
    parent.update(TIMESTAMP);
    assert.ok(childSpy.calledOnceWith(TIMESTAMP));
  });

  it("will render children GameObject", () => {
    const parent = new GameObject();
    const child = new GameObject();
    const childSpy = sinon.spy(child, "render");

    parent.addGameObject(child);
    assert.ok(childSpy.notCalled);

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    parent.render(ctx);
    assert.ok(childSpy.calledOnceWith(ctx));
  });
});

describe("GameObject components", () => {
  it("adds a component", () => {
    const gameObject = new GameObject();
    const component = new Component();
    should(gameObject.components).not.containEql(component);

    gameObject.addComponent(component);
    should(gameObject.components).containEql(component);
  });

  it("removes a component", () => {
    const gameObject = new GameObject();
    const component = new Component();
    gameObject.addComponent(component);

    gameObject.removeComponent(component);
    should(gameObject.components).not.containEql(component);
  });

  it("will update components", () => {
    const gameObject = new GameObject();
    const component = new Component();
    const componentSpy = sinon.spy(component, "update");

    gameObject.addComponent(component);
    assert.ok(componentSpy.notCalled);

    const TIMESTAMP = 12345;
    gameObject.update(TIMESTAMP);
    assert.ok(componentSpy.calledOnceWith(TIMESTAMP));
  });

  it("will render Components", () => {
    const gameObject = new GameObject();
    const component = new Component();

    const componentSpy = sinon.spy(component, "render");
    gameObject.addComponent(component);
    assert.ok(componentSpy.notCalled);

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    gameObject.render(ctx);
    assert.ok(componentSpy.calledOnceWith(ctx));
  });
});

describe("GameObject render", () => {
  it("will restore the state of the context", () => {
    const X_VALUE = 100;
    const Y_VALUE = 200;
    const ROTATION = Math.PI / 4;
    const gameObject = new GameObject({x: X_VALUE, y: Y_VALUE, rotation: ROTATION});

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    const beforeMatrix = ctx.currentTransform.toString();

    gameObject.render(ctx);

    const afterMatrix = ctx.currentTransform.toString();
    assert.equal(afterMatrix, beforeMatrix);
  });

  it("will not translate canvas based on Transform", () => {
    const X_VALUE = 100;
    const Y_VALUE = 200;
    const ROTATION = Math.PI / 2;
    const gameObject = new GameObject({x: X_VALUE, y: Y_VALUE, rotation: ROTATION});

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    const translateSpy = sinon.spy(ctx, "translate");
    const rotateSpy = sinon.spy(ctx, "rotate");

    gameObject.render(ctx);
    assert.ok(translateSpy.notCalled);
    assert.ok(rotateSpy.notCalled);
  });

  it("will translate canvas based on child GameObject Transforms", () => {
    const PARENT_X = 100;
    const PARENT_Y = 200;
    const PARENT_ROTATION = Math.PI / 2;
    const parent = new GameObject({x: PARENT_X, y: PARENT_Y, rotation: PARENT_ROTATION});

    const CHILD1_X = 300;
    const CHILD1_Y = 400;
    const CHILD1_ROTATION = Math.PI / 4;
    const child1 = new GameObject({x: CHILD1_X, y: CHILD1_Y, rotation: CHILD1_ROTATION});
    parent.addGameObject(child1);

    const CHILD2_X = 500;
    const CHILD2_Y = 600;
    const CHILD2_ROTATION = Math.PI / 8;
    const child2 = new GameObject({x: CHILD2_X, y: CHILD2_Y, rotation: CHILD2_ROTATION});
    parent.addGameObject(child2);

    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    const translateSpy = sinon.spy(ctx, "translate");
    const rotateSpy = sinon.spy(ctx, "rotate");

    parent.render(ctx);
    assert.ok(translateSpy.calledTwice);
    assert.ok(translateSpy.calledWith(CHILD1_X, -CHILD1_Y));
    assert.ok(translateSpy.calledWith(CHILD2_X, -CHILD2_Y));
    assert.ok(rotateSpy.calledTwice);
    assert.ok(rotateSpy.calledWith(CHILD1_ROTATION));
    assert.ok(rotateSpy.calledWith(CHILD2_ROTATION));
  });
});

describe("GameObject destroy", () => {
  it("removes GameObject from parent", () => {
    const DELTA_TIME = 5;
    
    const parent = new GameObject();
    const child = new GameObject();
    parent.addGameObject(child);

    child.destroy();
    parent.update(DELTA_TIME);

    should(parent.gameObjects).not.containEql(child);
  });

  it("waits for an update before destroying", () => {
    const parent = new GameObject();
    const child = new GameObject();
    parent.addGameObject(child);

    child.destroy();

    should(parent.gameObjects).containEql(child);
  });
});
