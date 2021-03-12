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
  
  function createRayBullet(sourceTransform, rayGunType) {
    const spread = Math.random() * rayGunType.spread - (rayGunType.spread / 2);
    const bulletAngle = sourceTransform.position.absoluteRotation + spread;

    const absoluteX = sourceTransform.position.getAbsoluteX(0, rayGunType.length/2, spread);
    const absoluteY = sourceTransform.position.getAbsoluteY(0, rayGunType.length/2, spread);

    const bullet = new DNA.GameObject({x: absoluteX, y: absoluteY, rotation: bulletAngle, shape: new DNA.Shapes.Rectangle(1, rayGunType.length)});

    const bulletComponent = new RayBullet(rayGunType);
    bullet.addComponent(bulletComponent);
  
    const renderer = new DNA.Components.Renderer();
    const hitbox = new DNA.Components.Hitbox();
    bullet.addComponent(renderer);
    bullet.addComponent(hitbox);
  
    return bullet;
  }