class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, Math.PI * 2);
    ctx.stroke();
  }
}

module.exports = Circle;
