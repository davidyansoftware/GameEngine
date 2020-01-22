/**
 * A Circle
 *
 * @impliments {ShapeType}
 */
class Circle {
  /**
   * Create a Circle object
   *
   * @param {number} radius - Radius of the circle
   */
  constructor(radius) {
    this.radius = radius;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  isCollidingWith(self, hurtbox) {
    return hurtbox.shape._isCollidingWithCircle(hurtbox, self);
  }

  _isCollidingWithCircle(self, hitbox) {
    let distanceBetween = Math.sqrt(
      Math.pow(
        self.gameObject.transform.absoluteX -
          hitbox.gameObject.transform.absoluteX,
        2
      ) +
        Math.pow(
          self.gameObject.transform.absoluteY -
            hitbox.gameObject.transform.absoluteY,
          2
        )
    );
    return distanceBetween <= self.shape.radius + hitbox.shape.radius;
  }
}

module.exports = Circle;
