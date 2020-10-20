const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();
const math = new DNA.Coordinate.Cartesian(0,0);

const camera = new DNA.GameObject();
const cameraComponent = new DNA.Components.Camera(canvas, root, "#FFF0C9");
camera.addComponent(cameraComponent);

const players = [];
const map = createMap(players);

const mouse = new DNA.Input.Mouse(cameraComponent, true);
const player = createPlayer(root, mouse, map);
players.push(player);
camera.addComponent(new Follow(player));


root.addGameObject(map.gameObject);

root.addGameObject(player);
root.addGameObject(camera);

new DNA.GameLoop(root);
