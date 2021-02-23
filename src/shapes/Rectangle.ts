import GameObject from "../GameObject";
import Transform from "../Transform";
import RectangleTransform from "../RectangleTransform";
import { circleRectangleCollision } from "./ShapeCollision";

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

    createTransform(gameObject: GameObject, x: number, y: number, rotation: number): Transform {
        return new RectangleTransform(gameObject, x, y, rotation, this);
      }

    render(ctx: CanvasRenderingContext2D) {
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }

    isEnclosing(self: Transform, other: Transform): boolean {
        if (!other || !self) return false;
        return other.transform.shape._isEnclosedByRectangle(other, self);
    }

    isExcluding(self: Transform, other: Transform): boolean {
        if (!other || !self) return false;
        return other.transform.shape._isExcludedByRectangle(other, self);
    }
    
}