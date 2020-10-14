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

function createPlayer(root, mouse) {
  const player = new DNA.GameObject();
  player.addComponent(new DNA.Components.Renderer(new DNA.Shapes.Circle(20)));

  const accel = new DNA.Coordinate.Cartesian(0, 0);
  const acceleration = new DNA.Components.Acceleration(accel, MAX_SPEED, DRAG);
  player.addComponent(acceleration);

  const leftHandPosition = new DNA.GameObject(-12.5, 12.5);
  const rightHandPosition = new DNA.GameObject(12.5, 12.5);
  const leftWeapons = [
    createFist(root, fastFist),
    createFist(root, normalFist),
    createFist(root, slowFist)
  ];
  const rightWeapons = [
    createGun(root, fastGun),
    createGun(root, normalGun),
    createGun(root, slowGun)
  ];
  const playerComponent = new Player(leftHandPosition, rightHandPosition, leftWeapons, rightWeapons);
  player.addComponent(playerComponent);

  player.addComponent(new MouseControls(mouse, playerComponent));
  player.addComponent(new KeyboardControls(acceleration, playerComponent));

  player.addGameObject(leftHandPosition);
  player.addGameObject(rightHandPosition);

  return player;
}