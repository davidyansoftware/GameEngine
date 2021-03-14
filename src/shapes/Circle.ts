import Cartesian from "../coordinate/Cartesian";
import Coordinate from "../coordinate/Coordinate";
import CircleTransform from "../CircleTransform";
import GameObject from "../GameObject";
import Shape from "../Shape";
import Transform from "../Transform";
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

  createTransform(gameObject: GameObject, x: number, y: number): Transform {
    return new CircleTransform(gameObject, x, y, this);
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
    return other.transform.shape._isEnclosedByCircle(other, self);
  }

  isExcluding(self: Transform, other: Transform): boolean {
    return other.transform.shape._isExcludedByCircle(other, self);
  }

  _enclose(self: Transform, other: Transform): void {
    other.transform.shape._becomeEnclosedByCircle(other, self);
  }

  _exclude(self: Transform, other: Transform): void {
    other.transform.shape._becomeExcludedByCircle(other, self);
  }

  _isEnclosedByCircle(self: Transform, circle: Transform): boolean {
    let distanceBetween = Math.sqrt(
      Math.pow(self.transform.position.absoluteX - circle.transform.position.absoluteX, 2) +
        Math.pow(self.transform.position.absoluteY - circle.transform.position.absoluteY, 2)
    );

    const otherCircle = <Circle>circle.transform.shape;
    return distanceBetween < otherCircle.radius - this.radius;
  }

  _isExcludedByCircle(self: Transform, circle: Transform): boolean {
    let distanceBetween = Math.sqrt(
      Math.pow(self.transform.position.absoluteX - circle.transform.position.absoluteX, 2) +
        Math.pow(self.transform.position.absoluteY - circle.transform.position.absoluteY, 2)
    );

    const otherCircle = <Circle>circle.transform.shape;
    return distanceBetween > otherCircle.radius + this.radius;
  }

  _becomeEnclosedByCircle(self: Transform, circle: Transform): void {
    if (!circle.transform?.shape.isEnclosing(circle, self)) {
      Circle.coordinate.x = self.transform.position.absoluteX - circle.transform.position.absoluteX;
      Circle.coordinate.y = self.transform.position.absoluteY - circle.transform.position.absoluteY;

      const enclosingCircle: Circle = <Circle>circle.transform.shape;
      const enclosedCircle: Circle = <Circle>self.transform.shape;
      Circle.coordinate.magnitude = enclosingCircle.radius - enclosedCircle.radius - 1;

      self.transform.position.absoluteX = circle.transform.position.absoluteX + Circle.coordinate.x;
      self.transform.position.absoluteY = circle.transform.position.absoluteY + Circle.coordinate.y;
    }
  }

  _becomeExcludedByCircle(self: Transform, circle: Transform): void {
    if (!circle.transform?.shape.isExcluding(circle, self)) {
      Circle.coordinate.x = self.transform.position.absoluteX - circle.transform.position.absoluteX;
      Circle.coordinate.y = self.transform.position.absoluteY - circle.transform.position.absoluteY;

      const excludingCircle: Circle = <Circle>circle.transform.shape;
      const excludedCircle: Circle = <Circle>self.transform.shape;
      Circle.coordinate.magnitude = excludingCircle.radius + excludedCircle.radius + 1;

      self.transform.position.absoluteX = circle.transform.position.absoluteX + Circle.coordinate.x;
      self.transform.position.absoluteY = circle.transform.position.absoluteY + Circle.coordinate.y;
    }
  }

  _isEnclosedByRectangle(self: Transform, rectangle: Transform): boolean {
    const rectCenterX = rectangle.transform.position.absoluteX;
    const rectCenterY = rectangle.transform.position.absoluteY;

    //TODO this should be changed once rectangle implements Shape
    const unknown = <unknown>rectangle.transform.shape;
    const rect = <Rectangle>unknown;
    
    const circleCenterX = self.transform.position.absoluteX;
    const circleCenterY = self.transform.position.absoluteY;

    const rectLeftX = rectCenterX - rect.width / 2;
    const rectRightX = rectLeftX + rect.width;
    const rectBottomY = rectCenterY - rect.height / 2;
    const rectTopY = rectBottomY + rect.height;

    const circle = <Circle>self.transform.shape;
    if (rectLeftX >= circleCenterX - circle.radius) {
      return false;
    }
    if (rectRightX <= circleCenterX + circle.radius) {
      return false;
    }
    if (rectBottomY >= circleCenterY - circle.radius) {
      return false;
    }
    if (rectTopY <= circleCenterY + circle.radius) {
      return false;
    }
    
    return true;
  }

  _isExcludedByRectangle(self: Transform, rectangle: Transform): boolean {
    const rectCenterX = rectangle.transform.position.absoluteX;
    const rectCenterY = rectangle.transform.position.absoluteY;

    //TODO this should be changed once rectangle implements Shape
    const unknown = <unknown>rectangle.transform.shape;
    const rect = <Rectangle>unknown;

    const circleCenterX = self.transform.position.absoluteX;
    const circleCenterY = self.transform.position.absoluteY;

    const rectLeftX = rectCenterX - rect.width / 2;
    const rectRightX = rectLeftX + rect.width;
    const rectBottomY = rectCenterY - rect.height / 2;
    const rectTopY = rectBottomY + rect.height;

    const circle = <Circle>self.transform.shape;
    if (rectLeftX > circleCenterX + circle.radius) {
      return true;
    }
    if (rectRightX < circleCenterX - circle.radius) {
      return true;
    }
    if (rectBottomY > circleCenterY + circle.radius) {
      return true;
    }
    if (rectTopY < circleCenterY - circle.radius) {
      return true;
    }
    
    return false;
  }
}