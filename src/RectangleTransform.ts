import GameObject from "./GameObject";
import Transform from "./Transform";
import { circleRectangleCollision, rectangleRectangleCollision } from "./shapes/ShapeCollision";
import Shape from "./Shape";
import CircleTransform from "./CircleTransform";
import Rectangle from "./shapes/Rectangle";
import Coordinate from "./coordinate/Coordinate";
import Cartesian from "./coordinate/Cartesian";

/**
 * A Rectangle Transform
 *
 * @impliments {Transform}
 */
export default class RectangleTransform extends Transform {
    private rectangle: Rectangle;

    private topLeft: Coordinate;
    private topRight: Coordinate;
    private bottomLeft: Coordinate;
    private bottomRight: Coordinate;

    private corners: Array<Coordinate>;
    private dirtyCorners: boolean;

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

        this.topLeft = new Cartesian(0, 0);
        this.topRight = new Cartesian(0, 0);
        this.bottomLeft = new Cartesian(0, 0);
        this.bottomRight = new Cartesian(0, 0);
        this.corners = [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight];

        this.dirtyCorners = true; // this is to indicate the corners are not cached
    }

    private cacheCorners() {
        const leftX = -this.rectangle.width / 2;
        const rightX = this.rectangle.width / 2;
        const topY = this.rectangle.height / 2;
        const bottomY = -this.rectangle.height / 2;
        
        this.topLeft.x = this.position.getAbsoluteX(leftX, topY);
        this.topLeft.y = this.position.getAbsoluteY(leftX, topY);

        this.topRight.x = this.position.getAbsoluteX(rightX, topY);
        this.topRight.y = this.position.getAbsoluteY(rightX, topY);

        this.bottomLeft.x = this.position.getAbsoluteX(leftX, bottomY);
        this.bottomLeft.y = this.position.getAbsoluteY(leftX, bottomY);

        this.bottomRight.x = this.position.getAbsoluteX(rightX, bottomY);
        this.bottomRight.y = this.position.getAbsoluteY(rightX, bottomY);
    }

    _getCorners(): Array<Coordinate> {
        if (this.dirtyCorners) {
            this.cacheCorners();
            this.dirtyCorners = false;
        }
        return this.corners;
    }

    _onPositionChange(): void {
        this.dirtyCorners = true;
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