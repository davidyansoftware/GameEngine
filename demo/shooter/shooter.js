const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();
const camera = new DNA.Components.Camera(canvas, root);
root.addComponent(camera);

const mouse = new DNA.Input.Mouse(camera, true);

const player = new DNA.GameObject();
player.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(20)));

const accel = new DNA.Coordinate.Cartesian(0, 0);
const acceleration = new DNA.Components.Acceleration(accel, MAX_SPEED, DRAG);
player.addComponent(acceleration);

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
  createGun(root, normalGun),
  createGun(root, slowGun)
];
const playerComponent = new Player(leftHandPosition, rightHandPosition, leftWeapons, rightWeapons);
player.addComponent(playerComponent);

player.addComponent(new MouseControls(mouse, playerComponent));
player.addComponent(new KeyboardControls(acceleration, playerComponent));

player.addGameObject(leftHandPosition);
player.addGameObject(rightHandPosition);

root.addGameObject(player);

new DNA.GameLoop(root);
