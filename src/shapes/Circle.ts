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

  isHitting(self: Hitbox, hurtbox: Hitbox): boolean {
    return hurtbox.shape._isHittingCircle(hurtbox, self);
  }

  _isHittingCircle(self: Hitbox, hurtbox: Hitbox): boolean {
    if (self.transform == null || hurtbox.transform == null) {
      //TODO test this
      return false;
    }

    let distanceBetween = Math.sqrt(
      Math.pow(self.transform.absoluteX - hurtbox.transform.absoluteX, 2) +
        Math.pow(self.transform.absoluteY - hurtbox.transform.absoluteY, 2)
    );

    // we know this will be a Circle because it's called from Circle's isHitting()
    const hurtBoxCircle: Circle = <Circle>hurtbox.shape;
    return distanceBetween <= this.radius + hurtBoxCircle.radius;
  }
}