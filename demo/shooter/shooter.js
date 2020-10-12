const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();
const camera = new DNA.Components.Camera(canvas, root);
root.addComponent(camera);

const coordinate = new DNA.Coordinate.Cartesian(0, 0);
function createBullet(x, y, angle) {
  const BULLET_SPEED = 1000;

  const bullet = new DNA.GameObject(x, y);

  coordinate.magnitude = BULLET_SPEED;
  coordinate.angle = angle;
  const physics = new DNA.Components.Physics(coordinate.x, coordinate.y);
  const bulletComponent = new Bullet(physics);
  bullet.addComponent(physics);
  bullet.addComponent(bulletComponent);

  const circle = new DNA.Shapes.Circle(2);
  const renderer = new DNA.Components.Renderer(circle);
  const hitbox = new DNA.Components.Hitbox(circle);
  bullet.addComponent(renderer);
  bullet.addComponent(hitbox);

  return bullet;
}

const LEFT_MOUSE_BUTTON = 0;

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
      console.log("firing!");

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

    const dx = this.mouse.x - this.transform.absoluteX;
    const dy = this.mouse.y - this.transform.absoluteY;
    this.transform.rotation = Math.atan2(dx, dy);

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
}

const mouse = new DNA.Input.Mouse(camera);

const player = new DNA.GameObject();
player.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(20)));
const accel = new DNA.Coordinate.Cartesian(0, 0);
const acceleration = new DNA.Components.Acceleration(accel, MAX_SPEED, DRAG);
player.addComponent(acceleration);
player.addComponent(new Player(root, mouse, acceleration));
const gun = new DNA.GameObject(0, 20);
gun.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
player.addGameObject(gun);

root.addGameObject(player);

new DNA.GameLoop(root);
