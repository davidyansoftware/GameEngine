class Player extends DNA.Component {
  constructor(leftHandPosition, rightHandPosition, leftWeapons, rightWeapons) {
    super();

    leftWeapons.forEach(weapon => {
        leftHandPosition.gameObject.addGameObject(weapon.gameObject);
        weapon.setPosition(leftHandPosition)
    });
    rightWeapons.forEach(weapon => {
        rightHandPosition.gameObject.addGameObject(weapon.gameObject);
        weapon.setPosition(rightHandPosition)
    });
    this.leftWeapons = leftWeapons;
    this.rightWeapons = rightWeapons;
    
    this.leftWeaponIndex = 0;
    this.rightWeaponIndex = 0;
  }

  get currLeftWeapon() {
      return this.leftWeapons[this.leftWeaponIndex];
  }

  get currRightWeapon() {
      return this.rightWeapons[this.rightWeaponIndex];
  }

  swapLeftWeapon() {
    this.leftWeaponIndex++;
    this.leftWeaponIndex %= this.leftWeapons.length;
  }

  swapRightWeapon() {
    this.rightWeaponIndex++;
    this.rightWeaponIndex %= this.rightWeapons.length;
  }

}

class PlayerPhysicalBody extends DNA.Components.PhysicalBody {
  constructor(map) {
    super(.05);

    this.map = map;
  }

  update(deltaTime) {
    super.update(deltaTime);

    this.drag = this.map.getDrag(this);
  }
}

function createPlayer(root, mouse, map) {
  const player = new DNA.GameObject(0,0,0,new DNA.Shapes.Circle(20));
  player.addComponent(new DNA.Components.Renderer());

  const physicalBody = new PlayerPhysicalBody(map);
  player.addComponent(physicalBody);

  const leftHandPosition = new DNA.GameObject(-12.5, 12.5);
  const rightHandPosition = new DNA.GameObject(12.5, 12.5);
  const leftWeapons = [
    createFist(root, fastFist),
    createFist(root, normalFist),
    createFist(root, slowFist)
  ];
  const rightWeapons = [
    createGun(root, physicalBody, fastGun),
    createGun(root, physicalBody, normalGun),
    createGun(root, physicalBody, rocketEngine)
  ];
  const playerComponent = new Player(leftHandPosition, rightHandPosition, leftWeapons, rightWeapons);
  player.addComponent(playerComponent);

  player.addComponent(new MouseControls(mouse, playerComponent));
  player.addComponent(new KeyboardControls(physicalBody, playerComponent));

  player.addGameObject(leftHandPosition);
  player.addGameObject(rightHandPosition);

  return player;
}