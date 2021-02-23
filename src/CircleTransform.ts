import GameObject from "./GameObject";
import Transform from "./Transform";
import { circleCircleCollision, circleRectangleCollision } from "./shapes/ShapeCollision";
import Shape from "./Shape";
import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";
import Hitbox from "./components/Hitbox";

/**
 * A Rectangle
 *
 * @impliments {Shape}
 */
export default class CircleTransform extends Transform {
    circle: Circle;

    /**
     * Create a Circle Transform
     *
     * @impliments {Transform}
     */
    constructor(gameObject: GameObject, x: number = 0, y: number = 0, rotation: number = 0, circle: Circle) {
        super(gameObject, x, y, rotation, circle);

        this.circle = circle;
    }
    
    isHitting(other: Transform): boolean {
        return other.transform._isHittingCircle(other, this);
    }

    _isHittingCircle(self: Transform, circle: CircleTransform): boolean {
        return circleCircleCollision(self, circle);
    }

    _isHittingRectangle(self: Transform, rectangle: Transform): boolean {
        return circleRectangleCollision(self, rectangle);
    }
}