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

    DNA.Keyboard.getKey(Q_KEY_CODE).addKeyDown(() => {
      this.player.swapLeftWeapon();
    });

    DNA.Keyboard.getKey(E_KEY_CODE).addKeyDown(() => {
      this.player.swapRightWeapon();
    });
  }

  update(deltaTime) {
    let x_movement = 0;
    const leftKey = DNA.Keyboard.getKey(A_KEY_CODE);
    if (leftKey.pressed) x_movement -= 1;
    const rightKey = DNA.Keyboard.getKey(D_KEY_CODE);
    if (rightKey.pressed) x_movement += 1;

    let y_movement = 0;
    const upKey = DNA.Keyboard.getKey(W_KEY_CODE);
    if (upKey.pressed) y_movement += 1;
    const downKey = DNA.Keyboard.getKey(S_KEY_CODE);
    if (downKey.pressed) y_movement -= 1;

    this.acceleration.x = x_movement;
    this.acceleration.y = y_movement;
    const isMoving = x_movement != 0 || y_movement != 0;
    this.acceleration.magnitude = isMoving ? ACCEL * deltaTime : 0;

    this.physicalBody.addVelocity(this.acceleration);
  }
}