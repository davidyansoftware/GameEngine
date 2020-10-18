const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();
const math = new DNA.Coordinate.Cartesian(0,0);

const camera = new DNA.GameObject();
const cameraComponent = new DNA.Components.Camera(canvas, root);
camera.addComponent(cameraComponent);

const mouse = new DNA.Input.Mouse(cameraComponent, true);
const player = createPlayer(root, mouse);
camera.addComponent(new Follow(player));

const ringCircle = new DNA.Shapes.Circle(5000)
const ring = new DNA.GameObject(0,0,0,ringCircle);
ring.addComponent(new DNA.Components.Renderer("#FFF0C9"));
ring.addComponent(new DNA.Components.EnclosingBoundary([player]));
root.addGameObject(ring);

function createObstacle() {
    math.magnitude = 100 + Math.random() * 4900;
    math.angle = Math.PI + Math.random() * Math.PI;
    const radius = 20 + Math.random() * 40;
    const obstacle = new DNA.GameObject(math.x,math.y,0,new DNA.Shapes.Circle(radius));
    obstacle.addComponent(new DNA.Components.Renderer("lightgreen"));
    obstacle.addComponent(new DNA.Components.ExcludingBoundary([player]));
    return obstacle;
}
for(let i = 0; i < 300; i++) {
    root.addGameObject(createObstacle());
}

const LAKE_RADIUS = 6500;
const lake = new DNA.GameObject(7000,2000,0,new DNA.Shapes.Circle(LAKE_RADIUS));
lake.addComponent(new DNA.Components.Renderer("lightblue"));
function createIsland() {
    math.magnitude = Math.random() * LAKE_RADIUS;
    math.angle = Math.random() * Math.PI * 2;
    const radius = 200 + Math.random() * 400;
    const island = new DNA.GameObject(math.x, math.y, 0, new DNA.Shapes.Circle(radius));
    island.addComponent(new DNA.Components.Renderer("#FFF0C9"));
    return island;
}
for (let i = 0; i < 50; i++) {
    lake.addGameObject(createIsland());
}
root.addGameObject(lake);

root.addGameObject(player);
root.addGameObject(camera);

new DNA.GameLoop(root);
