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
  
  //TODO this is currently depending on math from another module. These should be consolidated, likely within the game engine
  function createRayBullet(sourceTransform, mouseAngle, rayGunType) {
    const spread = Math.random() * rayGunType.spread - (rayGunType.spread / 2);
    const bulletAngle = mouseAngle + spread;

    math.angle = bulletAngle;
    math.magnitude = rayGunType.length / 2;

    const absoluteX = sourceTransform.position.getAbsoluteX(math.x, math.y);
    const absoluteY = sourceTransform.position.getAbsoluteY(math.x, math.y);

    const bullet = new DNA.GameObject({x: absoluteX, y: absoluteY, rotation: bulletAngle, shape: new DNA.Shapes.Rectangle(1, rayGunType.length)});

    const bulletComponent = new RayBullet(rayGunType);
    bullet.addComponent(bulletComponent);
  
    const renderer = new DNA.Components.Renderer();
    const hitbox = new DNA.Components.Hitbox();
    bullet.addComponent(renderer);
    bullet.addComponent(hitbox);
  
    return bullet;
  }