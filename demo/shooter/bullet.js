class Bullet extends DNA.Component {
  constructor(physics) {
    super();

    this.coordinate = new DNA.Coordinate.Cartesian(0, 0);
    this.distanceTraveled = 0;

    this.physics = physics;
  }

  update() {
    this.coordinate.x = this.physics.x;
    this.coordinate.y = this.physics.y;
    this.distanceTraveled += this.coordinate.magnitude;

    if (this.distanceTraveled >= 20000) {
      this.gameObject.destroy();
    }
  }
}
