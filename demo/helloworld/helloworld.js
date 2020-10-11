const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();

const cameraGameObject = new DNA.GameObject();
const camera = new DNA.Components.Camera(canvas, root);
cameraGameObject.addComponent(camera);
root.addGameObject(cameraGameObject);

const textGameObject = new DNA.GameObject();
const text = new DNA.Components.Text("Hello World!");
textGameObject.addComponent(text);
root.addGameObject(textGameObject);

root.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(100)));

class Follow extends DNA.Component {
  constructor(mouse) {
    super();

    this.mouse = mouse;
  }

  update() {
    const dx = this.mouse.x;
    const dy = this.mouse.y;
    this.transform.x += dx / 100;
    this.transform.y += dy / 100;
  }
}

const mouse = new DNA.Input.Mouse(camera);

const follow = new Follow(mouse);
cameraGameObject.addComponent(follow);

new DNA.GameLoop(root);