class RayGun extends DNA.Component {
    constructor(root, physicalBody, rayGunType) {
        super();

        this.root = root;
        this.physicalBody = physicalBody;
        this.rayGunType = rayGunType;

        this.bulletRays = [];
        this.mouseOffset = new DNA.Coordinate.Cartesian(0, 0);

        this.cooldown = 0;
        this.recoilVelocity = new DNA.Coordinate.Polar(this.rayGunType.recoilSpeed, 0);
    }

    update(deltaTime) {
        this.cooldown -= deltaTime;
    }

    attack(attacker, mouse) {
        if (this.cooldown > 0) {
            return;
        }

        const angleToMouse = this.getAngleToMouse(mouse);

        const bulletRay = createRayBullet(this.transform, angleToMouse, this.rayGunType);

        this.bulletRays.push(bulletRay);
        this.root.addGameObject(bulletRay);

        this.cooldown = this.rayGunType.cooldown;

        this.recoilVelocity.angle = angleToMouse + Math.PI;
        this.physicalBody.addVelocity(this.recoilVelocity);
    }

    setPosition(position) {
        // not needed for gun
    }

    // this is reused in multiple attacks, parent class "skillshot"
    getAngleToMouse(mouse) {
        this.mouseOffset.x = mouse.x - this.transform.position.absoluteX;
        this.mouseOffset.y = mouse.y - this.transform.position.absoluteY;
  
        return this.mouseOffset.angle;
    }
}

function createRayGun(root, physicalBody, gunType) {
  const gun = new DNA.GameObject({shape: new DNA.Shapes.Circle(10)});
  gun.addComponent(new DNA.Components.Renderer());
  const gunComponent = new RayGun(root, physicalBody, gunType);
  gun.addComponent(gunComponent);

  return gunComponent;
}