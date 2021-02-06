import * as assert from "assert";
import * as sinon from "sinon";
import GameObject from "../../src/GameObject";
import Renderer from "../../src/components/Renderer";
import Circle from "../../src/shapes/Circle";
import Canvas from "canvas";

describe("Renderer", () => {
  it("will render a shape", () => {
    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");

    const circle = new Circle(5);
    const gameObject = new GameObject(0, 0, 0, circle);
    const renderer = new Renderer("black");
    gameObject.addComponent(renderer);

    const circleSpy = sinon.spy(circle, "render");
    renderer.render(ctx);
    assert.ok(circleSpy.calledOnce);
  });
});
