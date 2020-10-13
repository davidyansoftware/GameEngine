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

//TODO should pass in a gun config file (radius, speed, cooldown, etc)
const gun1 = new DNA.GameObject();
gun1.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const gunComponent1 = new Gun(root);
gun1.addComponent(gunComponent1);

const gun2 = new DNA.GameObject();
gun2.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const gunComponent2 = new Gun(root);
gun2.addComponent(gunComponent2);

const hand1 = new DNA.GameObject();
hand1.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const handComponent1 = new Hand(root);
hand1.addComponent(handComponent1);

const hand2 = new DNA.GameObject();
hand2.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const handComponent2 = new Hand(root);
hand2.addComponent(handComponent2);

const leftHandPosition = new DNA.GameObject(-12.5, 12.5);
const rightHandPosition = new DNA.GameObject(12.5, 12.5);
const leftWeapons = [
  handComponent1,
  handComponent2
];
const rightWeapons = [
  gunComponent1,
  gunComponent2
];
const playerComponent = new Player(leftHandPosition, rightHandPosition, leftWeapons, rightWeapons);
player.addComponent(playerComponent);

player.addComponent(new MouseControls(mouse, playerComponent));
player.addComponent(new KeyboardControls(acceleration, playerComponent));

player.addGameObject(leftHandPosition);
player.addGameObject(rightHandPosition);

root.addGameObject(player);

new DNA.GameLoop(root);
