class Gun extends DNA.Component {
  constructor(root, physicalBody, gunType) {
    super();

    this.root = root;
    this.physicalBody = physicalBody;
    this.gunType = gunType;

    this.bullets = [];
    this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);

    this.cooldown = 0;
    this.recoilVelocity = new DNA.Coordinate.Polar(this.gunType.recoilSpeed, 0);
  }

  update(deltaTime) {
    this.cooldown -= deltaTime;
  }

  attack(attacker, mouse) {
    if (this.cooldown > 0) {
      return;
    }

    const angleToMouse = this.getAngleToMouse(mouse);

    const bullet = createBullet(
      this.transform.position.absoluteX,
      this.transform.position.absoluteY,
      angleToMouse,
      this.gunType
    );

    this.bullets.push(bullet);
    this.root.addGameObject(bullet);

    this.cooldown = this.gunType.cooldown;
    
    this.recoilVelocity.angle = angleToMouse + Math.PI
    this.physicalBody.addVelocity(this.recoilVelocity);
  }

  setPosition(position) {
      // not needed for gun
  }

  getAngleToMouse(mouse) {
      this.mouseOffset.x = mouse.x - this.transform.position.absoluteX;
      this.mouseOffset.y = mouse.y - this.transform.position.absoluteY;

      return this.mouseOffset.angle;
  }
}

function createGun(root, physicalBody, gunType) {
  const gun = new DNA.GameObject({shape: new DNA.Shapes.Circle(10)});
  gun.addComponent(new DNA.Components.Renderer());
  const gunComponent = new Gun(root, physicalBody, gunType);
  gun.addComponent(gunComponent);

  return gunComponent;
}