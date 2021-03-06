class Fist extends DNA.Component {
  constructor(root, fistType) {
    super();

    this.root = root;
    this.fistType = fistType;

    this.target;
    this.attached = true;
  }

  attack(attacker, mouse) {
    if (this.attached) {
        this.attached = false;
        this.root.addGameObject(this.gameObject, true);

        this.target = new DNA.GameObject({x: mouse.x, y: mouse.y});
        this.root.addGameObject(this.target);

        const moveTo = new MoveTo(this.target, this.fistType.speed, () => {
            this.comeBack();
        });
        this.gameObject.addComponent(moveTo);
    }
  }

  setPosition(position) {
    this.handPosition = position;
  }

  comeBack() {
    this.target.destroy();

    const moveTo = new MoveTo(this.handPosition, this.fistType.speed, () => {
        this.reattach();
    });
    this.gameObject.addComponent(moveTo);
  }

  reattach() {
    this.handPosition.gameObject.addGameObject(this.gameObject);
    this.transform.position.x = 0;
    this.transform.position.y = 0;
    this.attached = true;
  }
}

function createFist(root, fistType) {
  const fist = new DNA.GameObject({shape: new DNA.Shapes.Circle(fistType.radius)});
  fist.addComponent(new DNA.Components.Renderer());
  const fistComponent = new Fist(root, fistType);
  fist.addComponent(fistComponent);

  return fistComponent;
}