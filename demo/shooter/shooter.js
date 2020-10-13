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
//leftGun.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const leftGunComponent = new Gun(root);
leftGun.addComponent(leftGunComponent);

const rightGun = new DNA.GameObject(12.5, 12.5);
//rightGun.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const rightGunComponent = new Gun(root);
rightGun.addComponent(rightGunComponent);

const player = new DNA.GameObject();
player.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(20)));

const accel = new DNA.Coordinate.Cartesian(0, 0);
const acceleration = new DNA.Components.Acceleration(accel, MAX_SPEED, DRAG);
player.addComponent(acceleration);

const leftHandPosition = new DNA.GameObject(-12.5, 12.5);
const rightHandPosition = new DNA.GameObject(12.5, 12.5);

const leftHand1 = new DNA.GameObject(-12.5, 12.5);
leftHand1.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const leftHandComponent1 = new Hand(root, player, leftHandPosition);
leftHand1.addComponent(leftHandComponent1);

const leftHand2 = new DNA.GameObject(-12.5, 12.5);
leftHand2.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const leftHandComponent2 = new Hand(root, player, leftHandPosition);
leftHand2.addComponent(leftHandComponent2);

const leftHand3 = new DNA.GameObject(-12.5, 12.5);
leftHand3.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const leftHandComponent3 = new Hand(root, player, leftHandPosition);
leftHand3.addComponent(leftHandComponent3);

const rightHand1 = new DNA.GameObject(12.5, 12.5);
rightHand1.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const rightHandComponent1 = new Hand(root, player, rightHandPosition);
rightHand1.addComponent(rightHandComponent1);

const rightHand2 = new DNA.GameObject(12.5, 12.5);
rightHand2.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const rightHandComponent2 = new Hand(root, player, rightHandPosition);
rightHand2.addComponent(rightHandComponent2);

const rightHand3 = new DNA.GameObject(12.5, 12.5);
rightHand3.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
const rightHandComponent3 = new Hand(root, player, rightHandPosition);
rightHand3.addComponent(rightHandComponent3);

const leftWeapons = [
  leftHandComponent1,
  leftHandComponent2,
  leftHandComponent3
];

const rightWeapons = [
  rightHandComponent1,
  rightHandComponent2,
  rightHandComponent3
]

const playerComponent = new Player(leftWeapons, rightWeapons);
player.addComponent(playerComponent);

player.addComponent(new MouseControls(mouse, playerComponent));
player.addComponent(new KeyboardControls(acceleration, playerComponent));

player.addGameObject(leftGun);
player.addGameObject(rightGun);

player.addGameObject(leftHandPosition);
player.addGameObject(leftHand1);
player.addGameObject(leftHand2);
player.addGameObject(leftHand3);
player.addGameObject(rightHandPosition);
player.addGameObject(rightHand1);
player.addGameObject(rightHand2);
player.addGameObject(rightHand3);

root.addGameObject(player);

new DNA.GameLoop(root);
