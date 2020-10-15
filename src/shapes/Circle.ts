import Hitbox from "../components/Hitbox";
import Shape from "../Shape";

/**
 * A Circle
 *
 * @impliments {Shape}
 */
export default class Circle implements Shape {
  radius: number;

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

  isHitting(self: Hitbox<Circle>, other: Hitbox<any>): boolean {
    return other.shape._isHittingCircle(other, self);
  }

  _isHittingCircle(self: Hitbox<Circle>, other: Hitbox<Circle>): boolean {
    if (self.transform == null || other.transform == null) {
      //TODO test this
      return false;
    }

    let distanceBetween = Math.sqrt(
      Math.pow(self.transform.absoluteX - other.transform.absoluteX, 2) +
        Math.pow(self.transform.absoluteY - other.transform.absoluteY, 2)
    );

    const otherCircle: Circle = other.shape;
    return distanceBetween <= this.radius + otherCircle.radius;
  }
}