import * as assert from "assert";
import * as sinon from "sinon";
import Rectangle from "../../src/shapes/Rectangle";
import Canvas from "canvas";

describe("Rectangle render", () => {
    it("renders a rectangle", () => {
        const canvas = Canvas.createCanvas(100, 100);
        const ctx = canvas.getContext("2d");
        const ctxSpy = sinon.spy(ctx, "strokeRect");

        const WIDTH = 5;
        const HEIGHT = 10;
        const rectangle = new Rectangle(WIDTH, HEIGHT);
        rectangle.render(ctx);
        
        assert.ok(ctxSpy.calledOnceWith(-WIDTH/2, -HEIGHT/2, WIDTH, HEIGHT));
    });
});