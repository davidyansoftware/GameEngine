class Player extends DNA.Component {
  constructor(leftWeapons, rightWeapons) {
    super();

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