const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();

const camera = new DNA.GameObject();
const cameraComponent = new DNA.Components.Camera(canvas, root);
camera.addComponent(cameraComponent);

const mouse = new DNA.Input.Mouse(cameraComponent, true);
const player = createPlayer(root, mouse);
camera.addComponent(new Follow(player));

const ring = new DNA.GameObject(0,0,0,new DNA.Shapes.Circle(5000));
ring.addComponent(new DNA.Components.Renderer());
ring.addComponent(new DNA.Components.EnclosingBoundary([player]));

const lake = new DNA.GameObject(7000,2000,0,new DNA.Shapes.Circle(6500));
lake.addComponent(new DNA.Components.Renderer());

const math = new DNA.Coordinate.Cartesian(0,0);
function createObstacle() {
    math.magnitude = Math.random() * 5000;
    math.angle = Math.random() * Math.PI * 2;
    const radius = 20 + Math.random() * 40;
    const obstacle = new DNA.GameObject(math.x,math.y,0,new DNA.Shapes.Circle(radius));
    obstacle.addComponent(new DNA.Components.Renderer());
    obstacle.addComponent(new DNA.Components.ExcludingBoundary([player]));
    return obstacle;
}

for(let i = 0; i < 300; i++) {
    root.addGameObject(createObstacle());
}

root.addGameObject(ring);
root.addGameObject(lake);
root.addGameObject(player);
root.addGameObject(camera);

new DNA.GameLoop(root);
