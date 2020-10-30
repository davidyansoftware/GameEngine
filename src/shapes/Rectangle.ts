import Shape from "../Shape";

/**
 * A Rectangle
 *
 * @impliments {Shape}
 */
export default class Rectangle {
    width: number;
    height: number;

    /**
     * Create a Rectangle object
     *
     * @param {number} width - Width of the rectangle
     * @param {number} height - Height of the rectangle
     */
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
}