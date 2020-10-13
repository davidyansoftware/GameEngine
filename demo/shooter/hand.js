class Hand extends DNA.Component {
  constructor(root) {
    super();

    this.root = root;

    this.target;
    this.attached = true;
  }

  attack(mouse) {
    if (this.attached) {
        this.attached = false;
        this.root.addGameObject(this.gameObject, true);

        this.target = new DNA.GameObject(mouse.x, mouse.y);
        this.root.addGameObject(this.target);

        const moveTo = new MoveTo(this.target, () => {
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

    const moveTo = new MoveTo(this.handPosition, () => {
        this.reattach();
    });
    this.gameObject.addComponent(moveTo);
  }

  reattach() {
    this.handPosition.gameObject.addGameObject(this.gameObject);
    this.transform.x = 0;
    this.transform.y = 0;
    this.attached = true;
  }
}