class Bullet extends DNA.Component {
  constructor(physics, gunType) {
    super();

    this.coordinate = new DNA.Coordinate.Cartesian(0, 0);
    this.distanceTraveled = 0;

    this.physics = physics;
    this.gunType = gunType;
  }

  update() {
    this.coordinate.x = this.physics.x;
    this.coordinate.y = this.physics.y;
    this.distanceTraveled += this.coordinate.magnitude;

    if (this.distanceTraveled >= this.gunType.bulletMaxDistance) {
      this.gameObject.destroy();
    }
  }
}

const coordinate = new DNA.Coordinate.Cartesian(0, 0);
function createBullet(x, y, angle, gunType) {
  const bullet = new DNA.GameObject(x, y);

  coordinate.magnitude = gunType.bulletSpeed;
  coordinate.angle = angle;
  const physics = new DNA.Components.Physics(coordinate.x, coordinate.y);
  const bulletComponent = new Bullet(physics, gunType);
  bullet.addComponent(physics);
  bullet.addComponent(bulletComponent);

  const circle = new DNA.Shapes.Circle(gunType.bulletRadius);
  const renderer = new DNA.Components.Renderer(circle);
  const hitbox = new DNA.Components.Hitbox(circle);
  bullet.addComponent(renderer);
  bullet.addComponent(hitbox);

  return bullet;
}