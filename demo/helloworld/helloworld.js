const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();

const cameraGameObject = new DNA.GameObject();
const camera = new DNA.Components.Camera(canvas, root);
cameraGameObject.addComponent(camera);
root.addGameObject(cameraGameObject);

const circleGameObject = new DNA.GameObject({shape: new DNA.Shapes.Circle(100)});
circleGameObject.addComponent(new DNA.Components.Renderer());
const textGameObject = new DNA.GameObject();
const text = new DNA.Components.Text("Hello World!");
textGameObject.addComponent(text);
circleGameObject.addGameObject(textGameObject);

root.addGameObject(circleGameObject);

root.addComponent(new DNA.Components.Renderer());

class Follow extends DNA.Component {
  constructor(mouse) {
    super();

    this.mouse = mouse;
  }

  update() {
    const dx = this.mouse.x - this.transform.position.x;
    const dy = this.mouse.y - this.transform.position.y;
    this.transform.position.x += dx / 10;
    this.transform.position.y += dy / 10;
  }
}

const mouse = new DNA.Input.Mouse(document, camera);

const follow = new Follow(mouse);
circleGameObject.addComponent(follow);

new DNA.GameLoop(root);
