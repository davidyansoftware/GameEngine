import Rectangle from "../../src/shapes/Rectangle";
import Canvas from "canvas";

describe("Rectangle render", () => {
    test("render renders a rectangle", () => {
        const canvas = Canvas.createCanvas(100, 100);
        const ctx = canvas.getContext("2d");
        jest.spyOn(ctx, "strokeRect");

        const WIDTH = 5;
        const HEIGHT = 10;
        const rectangle = new Rectangle(WIDTH, HEIGHT);
        rectangle.render(ctx);
        expect(ctx.strokeRect).toHaveBeenCalledTimes(1);
        expect(ctx.strokeRect).toHaveBeenLastCalledWith(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT);
    });
});