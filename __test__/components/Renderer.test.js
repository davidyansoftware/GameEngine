//const Canvas = require("canvas");
import Renderer from "../../src/components/Renderer";
import Circle from "../../src/shapes/Circle";
import Canvas from "canvas";

describe("Renderer", () => {
  test("Renderer will render a shape", () => {
    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");

    const circle = new Circle(5);
    const renderer = new Renderer(circle);

    jest.spyOn(circle, "render");
    renderer.render(ctx);
    expect(circle.render).toHaveBeenCalledTimes(1);
  });
});
