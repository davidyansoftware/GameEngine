const Circle = require("../../src/shapes/Circle");
const Canvas = require("canvas");

describe("Circle", () => {
  test("render renders a circle", () => {
    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    jest.spyOn(ctx, "arc");
    jest.spyOn(ctx, "stroke");

    const RADIUS = 5;
    const circle = new Circle(RADIUS);
    circle.render(ctx);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenLastCalledWith(0, 0, RADIUS, Math.PI * 2);
    expect(ctx.stroke).toHaveBeenCalledTimes(1);
  });
});
