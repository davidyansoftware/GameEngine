import Cartesian from "../coordinate/Cartesian";
import Circle from "./Circle";
import CircleTransform from "../CircleTransform";
import RectangleTransform from "../RectangleTransform";
import Transform from "../Transform";
import Rectangle from "./Rectangle";

const coordinate = new Cartesian(0, 0);

export function circleCircleCollision(
    circle1: CircleTransform,
    circle2: CircleTransform,
): boolean {
      let distanceBetween = Math.sqrt(
        Math.pow(circle1.transform.position.absoluteX - circle2.transform.position.absoluteX, 2) +
          Math.pow(circle1.transform.position.absoluteY - circle2.transform.position.absoluteY, 2)
      );
  
      const circle1Shape = <Circle>circle1.transform.shape;
      const circle2Shape = <Circle>circle2.transform.shape;
      return distanceBetween <= circle1Shape.radius + circle2Shape.radius;
}

export function circleRectangleCollision(
    circle: CircleTransform,
    rectangle: RectangleTransform
): boolean {
    const rectCenterX = rectangle.transform.position.absoluteX;
    const rectCenterY = rectangle.transform.position.absoluteY;
    const rectRotation = rectangle.transform.position.absoluteRotation;

    //TODO current workaround since rectangle does not fully impliment Shape
    const unknown = <unknown>rectangle.transform.shape;
    const rectShape = <Rectangle>unknown;

    const counterRotatedCircleX = Math.cos(rectRotation) * (circle.transform.position.x - rectCenterX) - Math.sin(rectRotation) * (circle.transform.position.y - rectCenterY) + rectCenterX;
    const counterRotatedCircleY = Math.sin(rectRotation) * (circle.transform.position.x - rectCenterX) + Math.cos(rectRotation) * (circle.transform.position.y - rectCenterY) + rectCenterY;

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

export function rectangleRectangleCollision (
  rectangle1: RectangleTransform,
  rectangle2: RectangleTransform
): boolean {
  return true;
}