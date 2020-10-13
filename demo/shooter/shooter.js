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

const leftGun = new DNA.GameObject(-12.5, 12.5);
leftGun.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const leftGunComponent = new Gun(root);
leftGun.addComponent(leftGunComponent);

const rightGun = new DNA.GameObject(12.5, 12.5);
rightGun.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const rightGunComponent = new Gun(root);
rightGun.addComponent(rightGunComponent);

const player = new DNA.GameObject();
player.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(20)));

const accel = new DNA.Coordinate.Cartesian(0, 0);
const acceleration = new DNA.Components.Acceleration(accel, MAX_SPEED, DRAG);
player.addComponent(acceleration);

const leftHandPosition = new DNA.GameObject(-12.5, 12.5);
const leftHand = new DNA.GameObject(-12.5, 12.5);
leftHand.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const leftHandComponent = new Hand(root, player, leftHandPosition);
leftHand.addComponent(leftHandComponent);

const rightHandPosition = new DNA.GameObject(12.5, 12.5);
const rightHand = new DNA.GameObject(12.5, 12.5);
rightHand.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const rightHandComponent = new Hand(root, player, rightHandPosition);
rightHand.addComponent(rightHandComponent);

player.addComponent(new MouseControls(mouse, leftGunComponent, rightGunComponent, leftHandComponent, rightHandComponent));
player.addComponent(new KeyboardControls(acceleration));

player.addGameObject(leftGun);
player.addGameObject(rightGun);

player.addGameObject(leftHandPosition);
player.addGameObject(leftHand);
player.addGameObject(rightHandPosition);
player.addGameObject(rightHand);

root.addGameObject(player);

new DNA.GameLoop(root);
