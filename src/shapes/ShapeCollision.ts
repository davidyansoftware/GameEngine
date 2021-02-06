import Circle from "./Circle";
import GameObject from "../GameObject";

export function circleCircleCollision(
    circle1: GameObject,
    circle2: GameObject,
): boolean {
    if (circle1.transform == null || circle2.transform == null) {
        //TODO test this
        return false;
      }
  
      let distanceBetween = Math.sqrt(
        Math.pow(circle1.transform.absoluteX - circle2.transform.absoluteX, 2) +
          Math.pow(circle1.transform.absoluteY - circle2.transform.absoluteY, 2)
      );
  
      const circle1Shape = <Circle>circle1.transform.shape;
      const circle2Shape = <Circle>circle2.transform.shape;
      return distanceBetween <= circle1Shape.radius + circle2Shape.radius;
}