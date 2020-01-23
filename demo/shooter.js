const canvas = document.getElementById("canvas");

const root = new DNA.GameObject();
const camera = new DNA.Components.Camera(canvas, root);
root.addComponent(camera);

class Player extends DNA.Component {
  constructor(mouse) {
    super();

    this.mouse = mouse;
  }

  update() {
    const dx = this.mouse.x - this.gameObject.transform.absoluteX;
    const dy = this.mouse.y - this.gameObject.transform.absoluteY;
    this.gameObject.transform.rotation = Math.atan2(dy, dx) + Math.PI / 2;
  }
}

const mouse = new DNA.Input.Mouse(camera);

const player = new DNA.GameObject();
player.addComponent(new DNA.Components.Shape(new DNA.ShapeTypes.Circle(20)));
player.addComponent(new Player(mouse));
const gun = new DNA.GameObject(0, 20);
gun.addComponent(new DNA.Components.Shape(new DNA.ShapeTypes.Circle(10)));
player.addGameObject(gun);

root.addGameObject(player);

new DNA.GameLoop(root);