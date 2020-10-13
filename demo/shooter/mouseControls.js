const LEFT_MOUSE_BUTTON = 0;
const RIGHT_MOUSE_BUTTON = 2;

class MouseControls extends DNA.Component {
  constructor(mouse, leftGun) {
    super();

    this.mouse = mouse;
    this.leftGun = leftGun;

    this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);
  }

  update() {
    const leftMouseButton = this.mouse.getButton(LEFT_MOUSE_BUTTON);
    if (leftMouseButton.pressed) {
      this.shoot();
    }

    const rightMouseButton = this.mouse.getButton(RIGHT_MOUSE_BUTTON);
    if (rightMouseButton.pressed) {
        this.shoot();
    }

    const dx = this.mouse.x - this.transform.absoluteX;
    const dy = this.mouse.y - this.transform.absoluteY;
    this.transform.rotation = Math.atan2(dx, dy);
  }

  shoot() {
    this.mouseOffset.x = this.mouse.x - this.transform.x;
    this.mouseOffset.y = this.mouse.y - this.transform.y;

    this.leftGun.shoot(this.mouseOffset.angle)
  }
}