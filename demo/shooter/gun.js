class Gun extends DNA.Component {
  constructor(root) {
    super();

    this.root = root;

    this.bullets = [];
    this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);
  }

  attack(mouse) {
    const bullet = createBullet(
      this.transform.absoluteX,
      this.transform.absoluteY,
      this.getAngleToMouse(mouse)
    );

    this.bullets.push(bullet);
    this.root.addGameObject(bullet);
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