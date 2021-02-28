class RayBullet extends DNA.Component {
    constructor(rayGunType) {
      super();
  
      this.rayGunType = rayGunType;
      
      this.maxDuration = rayGunType.duration;
      this.duration = 0;
    }
  
    update(deltaTime) {
      this.duration += deltaTime;
  
      if (this.duration >= this.maxDuration) {
        this.gameObject.destroy();
      }
    }
  }
  
  const rayBulletCenter = new DNA.Coordinate.Cartesian(0, 0);
  function createRayBullet(sourceTransform, angle, rayGunType) {
    rayBulletCenter.x = sourceTransform.position.getAbsoluteX(0, rayGunType.length/2);
    rayBulletCenter.y = sourceTransform.position.getAbsoluteY(0, rayGunType.length/2);

    const bullet = new DNA.GameObject({x: rayBulletCenter.x, y: rayBulletCenter.y, rotation: angle, shape: new DNA.Shapes.Rectangle(1, rayGunType.length)});

    const bulletComponent = new RayBullet(rayGunType);
    bullet.addComponent(bulletComponent);
  
    const renderer = new DNA.Components.Renderer();
    const hitbox = new DNA.Components.Hitbox();
    bullet.addComponent(renderer);
    bullet.addComponent(hitbox);
  
    return bullet;
  }