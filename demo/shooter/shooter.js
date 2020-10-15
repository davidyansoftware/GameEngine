const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();

const camera = new DNA.GameObject();
const cameraComponent = new DNA.Components.Camera(canvas, root);
camera.addComponent(cameraComponent);

const ring = new DNA.GameObject();
const circle = new DNA.Components.Renderer(new DNA.Shapes.Circle(500));
ring.addComponent(circle);

const mouse = new DNA.Input.Mouse(cameraComponent, true);
const player = createPlayer(root, mouse);
camera.addComponent(new Follow(player));

root.addGameObject(ring);
root.addGameObject(player);
root.addGameObject(camera);

new DNA.GameLoop(root);
