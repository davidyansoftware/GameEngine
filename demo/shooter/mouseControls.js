const LEFT_MOUSE_BUTTON = 0;
const RIGHT_MOUSE_BUTTON = 2;

class MouseControls extends DNA.Component {
  constructor(root, mouse) {
    super();

    this.root = root;

    this.mouse = mouse;

    this.bullets = [];

    this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);
  }

  update() {
    const leftMouseButton = this.mouse.getButton(LEFT_MOUSE_BUTTON);
    if (leftMouseButton.pressed) {
      console.log("left firing!");

      this.shoot();
    }

    const rightMouseButton = this.mouse.getButton(RIGHT_MOUSE_BUTTON);
    if (rightMouseButton.pressed) {
        console.log("right firing!");

        this.shoot();
    }

    const dx = this.mouse.x - this.transform.absoluteX;
    const dy = this.mouse.y - this.transform.absoluteY;
    this.transform.rotation = Math.atan2(dx, dy);
  }

  shoot() {
    this.mouseOffset.x = this.mouse.x - this.transform.x;
    this.mouseOffset.y = this.mouse.y - this.transform.y;

    const bullet = createBullet(
      this.transform.x,
      this.transform.y,
      this.mouseOffset.angle
    );

    this.bullets.push(bullet);
    console.log(this.bullets.length);
    this.root.addGameObject(bullet);
  }
}