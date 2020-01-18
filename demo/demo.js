const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const root = new DNA.GameObject();
const camera = new DNA.Components.Camera(ctx, root);
const text = new DNA.Components.Text("Hello World!");

root.addComponent(camera);
root.addComponent(text);

root.update();
