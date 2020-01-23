const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();

const cameraGameObject = new DNA.GameObject(100, 100, Math.PI / 4);
const camera = new DNA.Components.Camera(canvas, root);
const text = new DNA.Components.Text("Hello World!");

cameraGameObject.addComponent(camera);
root.addGameObject(cameraGameObject);

root.addComponent(text);
root.addComponent(new DNA.Components.Shape(new DNA.ShapeTypes.Circle(100)));

new DNA.GameLoop(root);
