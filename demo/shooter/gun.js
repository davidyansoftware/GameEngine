class Gun extends DNA.Component {
  constructor(root) {
    super();

    this.root = root;

    this.bullets = [];
  }

  shoot(angle) {
    const bullet = createBullet(
      this.transform.absoluteX,
      this.transform.absoluteY,
      angle
    );

    this.bullets.push(bullet);
    this.root.addGameObject(bullet);
  }
}