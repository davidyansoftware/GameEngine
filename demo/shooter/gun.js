class Gun extends DNA.Component {
  constructor(root, gunType) {
    super();

    this.root = root;
    this.gunType = gunType;

    this.bullets = [];
    this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);

    this.cooldown = 0;
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
      this.transform.absoluteX,
      this.transform.absoluteY,
      angleToMouse,
      this.gunType
    );

    this.bullets.push(bullet);
    this.root.addGameObject(bullet);

    this.cooldown = this.gunType.cooldown;

    const recoilVelocity = new DNA.Coordinate.Polar(this.gunType.recoilSpeed, angleToMouse + Math.PI);
    const recoil = new Knockback(recoilVelocity, this.gunType.recoilDistance);
    attacker.gameObject.addComponent(recoil);
  }

  setPosition(position) {
      // not needed for gun
  }

  getAngleToMouse(mouse) {
      this.mouseOffset.x = mouse.x - this.transform.absoluteX;
      this.mouseOffset.y = mouse.y - this.transform.absoluteY;

      return this.mouseOffset.angle;
  }
}

function createGun(root, gunType) {
  const gun = new DNA.GameObject();
  gun.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(10)));
  const gunComponent = new Gun(root, gunType);
  gun.addComponent(gunComponent);

  return gunComponent;
}