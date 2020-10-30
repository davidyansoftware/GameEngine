import Cartesian from "../coordinate/Cartesian";
import Coordinate from "../coordinate/Coordinate";
import GameObject from "../GameObject";
import Hitbox from "../components/Hitbox";
import Shape from "../Shape";
import Rectangle from "./Rectangle";

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

  render(ctx: CanvasRenderingContext2D, fill: boolean): void {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    if (fill) {
      ctx.fill();
    }
  }

  isHitting(self: Hitbox, other: Hitbox): boolean {
    if (!other.transform) return false;
    return other.transform.shape._isHittingCircle(other, self);
  }

  isEnclosing(self: GameObject | null, other: GameObject | null): boolean {
    if (!self || !other) return false;
    return other.transform.shape._isEnclosedByCircle(other, self);
  }

  isExcluding(self: GameObject, other: GameObject): boolean {
    if (!other) return false;
    return other.transform.shape._isExcludedByCircle(other, self);
  }

  _enclose(self: GameObject, other: GameObject): void {
    if (!other) return;
    other.transform.shape._becomeEnclosedByCircle(other, self);
  }

  _exclude(self: GameObject, other: GameObject): void {
    if (!other) return;
    other.transform.shape._becomeExcludedByCircle(other, self);
  }

  _isHittingCircle(self: Hitbox, circle: Hitbox): boolean {
    if (self.transform == null || circle.transform == null) {
      //TODO test this
      return false;
    }

    let distanceBetween = Math.sqrt(
      Math.pow(self.transform.absoluteX - circle.transform.absoluteX, 2) +
        Math.pow(self.transform.absoluteY - circle.transform.absoluteY, 2)
    );

    const otherCircle: Circle = <Circle>circle.transform.shape;
    return distanceBetween <= this.radius + otherCircle.radius;
  }

  _isEnclosedByCircle(self: GameObject, circle: GameObject): boolean {
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

  _isExcludedByCircle(self: GameObject, circle: GameObject): boolean {
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

  _becomeEnclosedByCircle(self: GameObject, circle: GameObject): void {
    if (!circle.transform?.shape.isEnclosing(circle.gameObject, self.gameObject)) {
      Circle.coordinate.x = self.transform.absoluteX - circle.transform.absoluteX;
      Circle.coordinate.y = self.transform.absoluteY - circle.transform.absoluteY;

      const enclosingCircle: Circle = <Circle>circle.transform.shape;
      const enclosedCircle: Circle = <Circle>self.transform.shape;
      Circle.coordinate.magnitude = enclosingCircle.radius - enclosedCircle.radius - 1;

      self.transform.absoluteX = circle.transform.absoluteX + Circle.coordinate.x;
      self.transform.absoluteY = circle.transform.absoluteY + Circle.coordinate.y;
    }
  }

  _becomeExcludedByCircle(self: GameObject, circle: GameObject): void {
    if (!circle.transform?.shape.isExcluding(circle.gameObject, self.gameObject)) {
      Circle.coordinate.x = self.transform.absoluteX - circle.transform.absoluteX;
      Circle.coordinate.y = self.transform.absoluteY - circle.transform.absoluteY;

      const excludingCircle: Circle = <Circle>circle.transform.shape;
      const excludedCircle: Circle = <Circle>self.transform.shape;
      Circle.coordinate.magnitude = excludingCircle.radius + excludedCircle.radius + 1;

      self.transform.absoluteX = circle.transform.absoluteX + Circle.coordinate.x;
      self.transform.absoluteY = circle.transform.absoluteY + Circle.coordinate.y;
    }
  }

  _isHittingRectangle(self: GameObject | null, rectangle: GameObject | null): boolean {
    if (self == null || rectangle == null) {
      //TODO test this
      return false;
    }

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

    Circle.coordinate.x = counterRotatedCircleX - closestX;
    Circle.coordinate.y = counterRotatedCircleY - closestY;

    const circle = <Circle>self.transform.shape;

    return Circle.coordinate.magnitude <= circle.radius;
  }

  _isEnclosedByRectangle(self: GameObject, rectangle: GameObject): boolean {
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

  _isExcludedByRectangle(self: GameObject, rectangle: GameObject): boolean {
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