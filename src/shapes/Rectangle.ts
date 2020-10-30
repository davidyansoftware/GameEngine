import GameObject from "../GameObject";
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

    isHitting(self: GameObject, other: GameObject): boolean {
        if (!other.transform || !self.transform) return false;
        return other.transform.shape._isHittingRectangle(other, self);
    }

    isEnclosing(self: GameObject | null, other: GameObject | null): boolean {
        if (!other || !self) return false;
        return other.transform.shape._isEnclosedByRectangle(other, self);
    }

    isExcluding(self: GameObject | null, other: GameObject | null): boolean {
        if (!other || !self) return false;
        return other.transform.shape._isExcludedByRectangle(other, self);
    }
}