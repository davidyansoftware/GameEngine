const Shape = require("../../src/components/Shape");
const Circle = require("../../src/shapeTypes/Circle");
const Canvas = require("canvas");

describe("Shape", () => {
  test("Shape will draw a shape", () => {
    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");

    const circle = new Circle(5);
    const shape = new Shape(circle);

    jest.spyOn(circle, "render");
    shape.render(ctx);
    expect(circle.render).toHaveBeenCalledTimes(1);
  });
});
