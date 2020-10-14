const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();
const camera = new DNA.Components.Camera(canvas, root);
root.addComponent(camera);

const mouse = new DNA.Input.Mouse(camera, true);

const player = createPlayer(root, mouse);

root.addGameObject(player);

new DNA.GameLoop(root);
