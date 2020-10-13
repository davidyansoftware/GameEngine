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

const mouse = new DNA.Input.Mouse(camera, true);

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
