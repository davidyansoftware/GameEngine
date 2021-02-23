import GameObject from "./GameObject";
import Transform from "./Transform";
import { circleRectangleCollision, rectangleRectangleCollision } from "./shapes/ShapeCollision";
import Shape from "./Shape";
import Circle from "./shapes/Circle";
import CircleTransform from "./CircleTransform";
import Rectangle from "./shapes/Rectangle";
import Hitbox from "./components/Hitbox";

/**
 * A Rectangle Transform
 *
 * @impliments {Transform}
 */
export default class RectangleTransform extends Transform {
    rectangle: Rectangle;

    /**
     * Create a Rectangle object
     *
     * @param {number} width - Width of the rectangle
     * @param {number} height - Height of the rectangle
     */
    constructor(gameObject: GameObject, x: number = 0, y: number = 0, rotation: number = 0, rectangle: Rectangle) {
        const unknown = <unknown> rectangle;
        const shape = <Shape> unknown;
        super(gameObject, x, y, rotation, shape);

        this.rectangle = rectangle;
    }
    
    isHitting(other: Transform): boolean {
        return other.transform._isHittingRectangle(this);
    }

    _isHittingCircle(circle: CircleTransform): boolean {
        return circleRectangleCollision(circle, this);
    }

    _isHittingRectangle(rectangle: RectangleTransform): boolean {
        return rectangleRectangleCollision(rectangle, this);
    }
}