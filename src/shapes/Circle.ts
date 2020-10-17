import Cartesian from "../coordinate/Cartesian";
import Coordinate from "../coordinate/Coordinate";
import GameObject from "../GameObject";
import Hitbox from "../components/Hitbox";
import Shape from "../Shape";

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

  render(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.stroke();
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
}