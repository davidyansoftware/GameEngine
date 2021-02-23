import GameObject from "./GameObject";
import Transform from "./Transform";
import { circleCircleCollision, circleRectangleCollision } from "./shapes/ShapeCollision";
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
        return other.transform._isHittingRectangle(other, this);
    }

    _isHittingCircle(self: Transform, circle: CircleTransform): boolean {
        return circleRectangleCollision(circle, self);
    }

    _isHittingRectangle(self: Transform, circle: RectangleTransform): boolean {
        if (self == null || circle == null) {
            //TODO test this
            return false;
        }

        return circleRectangleCollision(circle, self);
    }
}