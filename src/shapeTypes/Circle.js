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

  isHitting(self, hurtbox) {
    return hurtbox.shapeType._isHittingCircle(hurtbox, self);
  }

  _isHittingCircle(hitbox, self) {
    let distanceBetween = Math.sqrt(
      Math.pow(hitbox.transform.absoluteX - self.transform.absoluteX, 2) +
        Math.pow(hitbox.transform.absoluteY - self.transform.absoluteY, 2)
    );
    return distanceBetween <= hitbox.shapeType.radius + self.shapeType.radius;
  }
}

module.exports = Circle;
