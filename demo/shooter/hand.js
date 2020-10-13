class Hand extends DNA.Component {
  constructor(root, player, handPosition) {
    super();

    this.root = root;
    this.handPosition = handPosition;

    this.target;
    this.player = player;
    this.attached = true;
  }

  attack(mouse) {
    if (this.attached) {
        this.attached = false;
        root.addGameObject(this.gameObject, true);

        this.target = new DNA.GameObject(mouse.x, mouse.y);
        this.root.addGameObject(this.target);

        const moveTo = new MoveTo(this.target, () => {
            this.comeBack();
        });
        this.gameObject.addComponent(moveTo);
    }
  }

  comeBack() {
    this.target.destroy();

    const moveTo = new MoveTo(this.handPosition, () => {
        this.reattach();
    });
    this.gameObject.addComponent(moveTo);
  }

  reattach() {
    this.player.gameObject.addGameObject(this.gameObject);
    this.transform.x = this.handPosition.transform.x;
    this.transform.y = this.handPosition.transform.y;
    this.attached = true;
  }
}