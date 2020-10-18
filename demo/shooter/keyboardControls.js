const W_KEY_CODE = 87;
const A_KEY_CODE = 65;
const S_KEY_CODE = 83;
const D_KEY_CODE = 68;

const Q_KEY_CODE = 81;
const E_KEY_CODE = 69;

const ACCEL = 2000;

class KeyboardControls extends DNA.Component {
  constructor(physicalBody, player) {
    super();

    this.physicalBody = physicalBody;
    this.player = player;

    this.acceleration = new DNA.Coordinate.Cartesian(0,0);

    this.keyboard = new DNA.Input.Keyboard();
    this.keyboard.getKey(Q_KEY_CODE).addKeyDown(() => {
      this.player.swapLeftWeapon();
    });

    this.keyboard.getKey(E_KEY_CODE).addKeyDown(() => {
      this.player.swapRightWeapon();
    });
  }

  update(deltaTime) {
    let x_movement = 0;
    const leftKey = this.keyboard.getKey(A_KEY_CODE);
    if (leftKey.pressed) x_movement -= 1;
    const rightKey = this.keyboard.getKey(D_KEY_CODE);
    if (rightKey.pressed) x_movement += 1;

    let y_movement = 0;
    const upKey = this.keyboard.getKey(W_KEY_CODE);
    if (upKey.pressed) y_movement += 1;
    const downKey = this.keyboard.getKey(S_KEY_CODE);
    if (downKey.pressed) y_movement -= 1;

    this.acceleration.x = x_movement;
    this.acceleration.y = y_movement;
    const isMoving = x_movement != 0 || y_movement != 0;
    this.acceleration.magnitude = isMoving ? ACCEL * deltaTime : 0;

    this.physicalBody.addVelocity(this.acceleration);
  }
}