const LEFT_MOUSE_BUTTON = 0;
const RIGHT_MOUSE_BUTTON = 2;

const W_KEY_CODE = 87;
const A_KEY_CODE = 65;
const S_KEY_CODE = 83;
const D_KEY_CODE = 68;

const ACCEL = 20;
const MAX_SPEED = 400;
const DRAG = .1;

class Player extends DNA.Component {
  constructor(root, mouse, acceleration) {
    super();

    this.root = root;

    this.mouse = mouse;
    this.acceleration = acceleration;

    this.bullets = [];

    this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);

    const circle = new DNA.Shapes.Circle(5);
    this.hitbox = new DNA.Components.Hitbox(circle);

    const self = this;
    this.hitbox.addOnHit((player, bullet) => {
      bullet.gameObject.destroy();

      const index = this.bullets.indexOf(bullet);
      self.bullets.splice(index, 1);
    });
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

    //TODO create a WASD template
    let x_movement = 0;
    const leftKey = DNA.Keyboard.getKey(A_KEY_CODE);
    if (leftKey.pressed) x_movement -= 1;
    const rightKey = DNA.Keyboard.getKey(D_KEY_CODE);
    if (rightKey.pressed) x_movement += 1;

    let y_movement = 0;
    const upKey = DNA.Keyboard.getKey(W_KEY_CODE);
    if (upKey.pressed) y_movement += 1;
    const downKey = DNA.Keyboard.getKey(S_KEY_CODE);
    if (downKey.pressed) y_movement -= 1;

    this.acceleration.acceleration.x = x_movement;
    this.acceleration.acceleration.y = y_movement;
    const isMoving = x_movement != 0 || y_movement != 0;
    this.acceleration.acceleration.magnitude = isMoving ? ACCEL : 0;
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