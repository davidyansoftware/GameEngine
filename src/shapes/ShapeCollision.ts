import Cartesian from "../coordinate/Cartesian";
import Circle from "./Circle";
import CircleTransform from "../CircleTransform";
import Transform from "../Transform";
import Rectangle from "./Rectangle";

const coordinate = new Cartesian(0, 0);

export function circleCircleCollision(
    circle1: Transform,
    circle2: CircleTransform,
): boolean {
      let distanceBetween = Math.sqrt(
        Math.pow(circle1.transform.absoluteX - circle2.transform.absoluteX, 2) +
          Math.pow(circle1.transform.absoluteY - circle2.transform.absoluteY, 2)
      );
  
      const circle1Shape = <Circle>circle1.transform.shape;
      const circle2Shape = <Circle>circle2.transform.shape;
      return distanceBetween <= circle1Shape.radius + circle2Shape.radius;
}

export function circleRectangleCollision(
    circle: Transform,
    rectangle: Transform
): boolean {
    const rectCenterX = rectangle.transform.absoluteX;
    const rectCenterY = rectangle.transform.absoluteY;
    const rectRotation = rectangle.transform.absoluteRotation;

    //TODO current workaround since rectangle does not fully impliment Shape
    const unknown = <unknown>rectangle.transform.shape;
    const rectShape = <Rectangle>unknown;

    const counterRotatedCircleX = Math.cos(rectRotation) * (circle.transform.x - rectCenterX) - Math.sin(rectRotation) * (circle.transform.y - rectCenterY) + rectCenterX;
    const counterRotatedCircleY = Math.sin(rectRotation) * (circle.transform.x - rectCenterX) + Math.cos(rectRotation) * (circle.transform.y - rectCenterY) + rectCenterY;

    const rectLeftX = rectCenterX - rectShape.width / 2;
    const rectRightX = rectLeftX + rectShape.width;
    const rectBottomY = rectCenterY - rectShape.height / 2;
    const rectTopY = rectBottomY + rectShape.height;
    
    let closestX;
    if (counterRotatedCircleX < rectLeftX) {
      closestX = rectLeftX;
    } else if (counterRotatedCircleX > rectRightX) {
      closestX = rectRightX;
    } else {
      closestX = counterRotatedCircleX;
    }

    let closestY;
    if (counterRotatedCircleY < rectBottomY) {
      closestY = rectBottomY;
    } else if (counterRotatedCircleY > rectTopY) {
      closestY = rectTopY;
    } else {
      closestY = counterRotatedCircleY;
    }

    coordinate.x = counterRotatedCircleX - closestX;
    coordinate.y = counterRotatedCircleY - closestY;

    const circleShape = <Circle>circle.transform.shape;

    return coordinate.magnitude <= circleShape.radius;
}