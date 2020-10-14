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

const leftHandPosition = new DNA.GameObject(-12.5, 12.5);
const rightHandPosition = new DNA.GameObject(12.5, 12.5);
const leftWeapons = [
  createFist(root, fastFist),
  createFist(root, normalFist),
  createFist(root, slowFist)
];
const rightWeapons = [
  createGun(root, fastGun),
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
