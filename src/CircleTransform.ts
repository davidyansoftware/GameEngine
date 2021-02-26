import GameObject from "./GameObject";
import Transform from "./Transform";
import { circleCircleCollision, circleRectangleCollision } from "./shapes/ShapeCollision";
import Circle from "./shapes/Circle";
import RectangleTransform from "./RectangleTransform";

/**
 * A Rectangle
 *
 * @impliments {Shape}
 */
export default class CircleTransform extends Transform {
    private circle: Circle;

    /**
     * Create a Circle Transform
     *
     * @impliments {Transform}
     */
    constructor(gameObject: GameObject, x: number = 0, y: number = 0, rotation: number = 0, circle: Circle) {
        super(gameObject, x, y, rotation, circle);

        this.circle = circle;
    }

    _onPositionChange(): void {
        // no change is required, since fields are not cached
    }
    
    isHitting(other: Transform): boolean {
        return other.transform._isHittingCircle(this);
    }

    _isHittingCircle(circle: CircleTransform): boolean {
        return circleCircleCollision(this, circle);
    }

    _isHittingRectangle(rectangle: RectangleTransform): boolean {
        return circleRectangleCollision(this, rectangle);
    }
}