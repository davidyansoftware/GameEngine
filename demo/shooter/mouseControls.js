const LEFT_MOUSE_BUTTON = 0;
const RIGHT_MOUSE_BUTTON = 2;

class MouseControls extends DNA.Component {
  constructor(mouse, player) {
    super();

    this.mouse = mouse;
    this.player = player;

    this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);
  }

  update() {
    const leftMouseButton = this.mouse.getButton(LEFT_MOUSE_BUTTON);
    if (leftMouseButton.pressed) {
      this.player.currLeftWeapon.attack(this.mouse);
    }

    const rightMouseButton = this.mouse.getButton(RIGHT_MOUSE_BUTTON);
    if (rightMouseButton.pressed) {
      this.player.currRightWeapon.attack(this.mouse);
    }

    const dx = this.mouse.x - this.transform.absoluteX;
    const dy = this.mouse.y - this.transform.absoluteY;
    this.transform.rotation = Math.atan2(dx, dy);
  }
  
}