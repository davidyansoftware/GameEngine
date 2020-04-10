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
  bullet.addComponent(physics);

  const shape = new DNA.Components.Shape(new DNA.ShapeTypes.Circle(2));
  bullet.addComponent(shape);

  return bullet;
}

const LEFT_MOUSE_BUTTON = 0;

const W_KEY_CODE = 87;
const A_KEY_CODE = 65;
const S_KEY_CODE = 83;
const D_KEY_CODE = 68;

const SPEED = 500;

class Player extends DNA.Component {
  constructor(root, mouse, physics) {
    super();

    this.root = root;

    this.mouse = mouse;
    this.physics = physics;

    this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);
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

      this.root.addGameObject(bullet);
    }

    const dx = this.mouse.x - this.transform.absoluteX;
    const dy = this.mouse.y - this.transform.absoluteY;
    this.transform.rotation = Math.atan2(dx, dy);

    let x_movement = 0;
    const leftKey = DNA.Keyboard.getKey(A_KEY_CODE);
    if (leftKey.pressed) x_movement -= SPEED;
    const rightKey = DNA.Keyboard.getKey(D_KEY_CODE);
    if (rightKey.pressed) x_movement += SPEED;

    let y_movement = 0;
    const upKey = DNA.Keyboard.getKey(W_KEY_CODE);
    if (upKey.pressed) y_movement += SPEED;
    const downKey = DNA.Keyboard.getKey(S_KEY_CODE);
    if (downKey.pressed) y_movement -= SPEED;

    //TODO account for diagonal speed
    this.physics.x = x_movement;
    this.physics.y = y_movement;
  }
}

const mouse = new DNA.Input.Mouse(camera);

const player = new DNA.GameObject();
player.addComponent(new DNA.Components.Shape(new DNA.ShapeTypes.Circle(20)));
const physics = new DNA.Components.Physics(0, 0);
player.addComponent(physics);
player.addComponent(new Player(root, mouse, physics));
const gun = new DNA.GameObject(0, 20);
gun.addComponent(new DNA.Components.Shape(new DNA.ShapeTypes.Circle(10)));
player.addGameObject(gun);

root.addGameObject(player);

new DNA.GameLoop(root);
