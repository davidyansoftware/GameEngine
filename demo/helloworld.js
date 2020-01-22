const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();
const camera = new DNA.Components.Camera(canvas, root);
const text = new DNA.Components.Text("Hello World!");

root.addComponent(camera);
root.addComponent(text);

root.addComponent(new DNA.Components.Shape(new DNA.ShapeTypes.Circle(100)));

root.update();
