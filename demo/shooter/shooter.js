const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();

const camera = new DNA.GameObject();
const cameraComponent = new DNA.Components.Camera(canvas, root);
camera.addComponent(cameraComponent);

const mouse = new DNA.Input.Mouse(cameraComponent, true);
const player = createPlayer(root, mouse);
camera.addComponent(new Follow(player));

const ring = new DNA.GameObject(0,0,0,new DNA.Shapes.Circle(500));
ring.addComponent(new DNA.Components.Renderer());
ring.addComponent(new DNA.Components.EnclosingBoundary([player]));

const pillar = new DNA.GameObject(0,0,0,new DNA.Shapes.Circle(20));
pillar.addComponent(new DNA.Components.Renderer());
pillar.addComponent(new DNA.Components.ExcludingBoundary([player]));

root.addGameObject(ring);
root.addGameObject(pillar);
root.addGameObject(player);
root.addGameObject(camera);

new DNA.GameLoop(root);
