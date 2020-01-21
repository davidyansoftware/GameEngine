class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI * 2);
    ctx.stroke();
  }

  isCollidingWith(self, hurtbox) {
    let distanceBetween = Math.sqrt(
      Math.pow(
        self.gameObject.transform.absoluteX -
          hurtbox.gameObject.transform.absoluteX,
        2
      ) +
        Math.pow(
          self.gameObject.transform.absoluteY -
            hurtbox.gameObject.transform.absoluteY,
          2
        )
    );
    return distanceBetween <= self.shape.radius + hurtbox.shape.radius;
  }
}

module.exports = Circle;
