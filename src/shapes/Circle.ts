import Cartesian from "../coordinate/Cartesian";
import Coordinate from "../coordinate/Coordinate";
import CircleTransform from "../CircleTransform";
import GameObject from "../GameObject";
import Hitbox from "../components/Hitbox";
import Shape from "../Shape";
import Transform from "../Transform";
import Rectangle from "./Rectangle";
import { circleCircleCollision, circleRectangleCollision } from "./ShapeCollision";

/**
 * A Circle
 *
 * @impliments {Shape}
 */
export default class Circle implements Shape {
  radius: number;

  private static coordinate: Coordinate = new Cartesian(0,0);

  /**
   * Create a Circle object
   *
   * @param {number} radius - Radius of the circle
   */
  constructor(radius: number) {
    this.radius = radius;
  }

  createTransform(gameObject: GameObject, x: number, y: number, rotation: number): Transform {
    return new CircleTransform(gameObject, x, y, rotation, this);
  }

  render(ctx: CanvasRenderingContext2D, fill: boolean): void {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    if (fill) {
      ctx.fill();
    }
  }

  isEnclosing(self: Transform, other: Transform): boolean {
    if (!self || !other) return false;
    return other.transform.shape._isEnclosedByCircle(other, self);
  }

  isExcluding(self: Transform, other: Transform): boolean {
    if (!other) return false;
    return other.transform.shape._isExcludedByCircle(other, self);
  }

  _enclose(self: Transform, other: Transform): void {
    if (!other) return;
    other.transform.shape._becomeEnclosedByCircle(other, self);
  }

  _exclude(self: Transform, other: Transform): void {
    if (!other) return;
    other.transform.shape._becomeExcludedByCircle(other, self);
  }

  _isEnclosedByCircle(self: Transform, circle: CircleTransform): boolean {
    if (self.transform == null || circle.transform == null) {
      //TODO test this
      return false;
    }

    let distanceBetween = Math.sqrt(
      Math.pow(self.transform.absoluteX - circle.transform.absoluteX, 2) +
        Math.pow(self.transform.absoluteY - circle.transform.absoluteY, 2)
    );

    const otherCircle: Circle = <Circle>circle.transform.shape;
    return distanceBetween < otherCircle.radius - this.radius;
  }

  _isExcludedByCircle(self: Transform, circle: Transform): boolean {
    if (self.transform == null || circle.transform == null) {
      //TODO test this
      return false;
    }

    let distanceBetween = Math.sqrt(
      Math.pow(self.transform.absoluteX - circle.transform.absoluteX, 2) +
        Math.pow(self.transform.absoluteY - circle.transform.absoluteY, 2)
    );

    const otherCircle: Circle = <Circle>circle.transform.shape;
    return distanceBetween > otherCircle.radius + this.radius;
  }

  _becomeEnclosedByCircle(self: Transform, circle: Transform): void {
    if (!circle.transform?.shape.isEnclosing(circle, self)) {
      Circle.coordinate.x = self.transform.absoluteX - circle.transform.absoluteX;
      Circle.coordinate.y = self.transform.absoluteY - circle.transform.absoluteY;

      const enclosingCircle: Circle = <Circle>circle.transform.shape;
      const enclosedCircle: Circle = <Circle>self.transform.shape;
      Circle.coordinate.magnitude = enclosingCircle.radius - enclosedCircle.radius - 1;

      self.transform.absoluteX = circle.transform.absoluteX + Circle.coordinate.x;
      self.transform.absoluteY = circle.transform.absoluteY + Circle.coordinate.y;
    }
  }

  _becomeExcludedByCircle(self: Transform, circle: Transform): void {
    if (!circle.transform?.shape.isExcluding(circle, self)) {
      Circle.coordinate.x = self.transform.absoluteX - circle.transform.absoluteX;
      Circle.coordinate.y = self.transform.absoluteY - circle.transform.absoluteY;

      const excludingCircle: Circle = <Circle>circle.transform.shape;
      const excludedCircle: Circle = <Circle>self.transform.shape;
      Circle.coordinate.magnitude = excludingCircle.radius + excludedCircle.radius + 1;

      self.transform.absoluteX = circle.transform.absoluteX + Circle.coordinate.x;
      self.transform.absoluteY = circle.transform.absoluteY + Circle.coordinate.y;
    }
  }

  _isEnclosedByRectangle(self: Transform, rectangle: Transform): boolean {
    const rectCenterX = rectangle.transform.absoluteX;
    const rectCenterY = rectangle.transform.absoluteY;
    const rectRotation = rectangle.transform.absoluteRotation;

    //TODO this should be changed once rectangle implements Shape
    const unknown = <unknown>rectangle.transform.shape;
    const rect = <Rectangle>unknown;

    const counterRotatedCircleX = Math.cos(rectRotation) * (self.transform.x - rectCenterX) - Math.sin(rectRotation) * (self.transform.y - rectCenterY) + rectCenterX;
    const counterRotatedCircleY = Math.sin(rectRotation) * (self.transform.x - rectCenterX) + Math.cos(rectRotation) * (self.transform.y - rectCenterY) + rectCenterY;

    const rectLeftX = rectCenterX - rect.width / 2;
    const rectRightX = rectLeftX + rect.width;
    const rectBottomY = rectCenterY - rect.height / 2;
    const rectTopY = rectBottomY + rect.height;

    const circle = <Circle>self.transform.shape;
    if (rectLeftX >= counterRotatedCircleX - circle.radius) {
      return false;
    }
    if (rectRightX <= counterRotatedCircleX + circle.radius) {
      return false;
    }
    if (rectBottomY >= counterRotatedCircleY - circle.radius) {
      return false;
    }
    if (rectTopY <= counterRotatedCircleY + circle.radius) {
      return false;
    }
    
    return true;
  }

  _isExcludedByRectangle(self: Transform, rectangle: Transform): boolean {
    const rectCenterX = rectangle.transform.absoluteX;
    const rectCenterY = rectangle.transform.absoluteY;
    const rectRotation = rectangle.transform.absoluteRotation;

    //TODO this should be changed once rectangle implements Shape
    const unknown = <unknown>rectangle.transform.shape;
    const rect = <Rectangle>unknown;

    const counterRotatedCircleX = Math.cos(rectRotation) * (self.transform.x - rectCenterX) - Math.sin(rectRotation) * (self.transform.y - rectCenterY) + rectCenterX;
    const counterRotatedCircleY = Math.sin(rectRotation) * (self.transform.x - rectCenterX) + Math.cos(rectRotation) * (self.transform.y - rectCenterY) + rectCenterY;

    const rectLeftX = rectCenterX - rect.width / 2;
    const rectRightX = rectLeftX + rect.width;
    const rectBottomY = rectCenterY - rect.height / 2;
    const rectTopY = rectBottomY + rect.height;

    const circle = <Circle>self.transform.shape;
    if (rectLeftX > counterRotatedCircleX + circle.radius) {
      return true;
    }
    if (rectRightX < counterRotatedCircleX - circle.radius) {
      return true;
    }
    if (rectBottomY > counterRotatedCircleY + circle.radius) {
      return true;
    }
    if (rectTopY < counterRotatedCircleY - circle.radius) {
      return true;
    }
    
    return false;
  }
}