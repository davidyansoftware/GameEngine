const W_KEY_CODE = 87;
const A_KEY_CODE = 65;
const S_KEY_CODE = 83;
const D_KEY_CODE = 68;

const ACCEL = 20;
const MAX_SPEED = 400;
const DRAG = .1;

class KeyboardControls extends DNA.Component {
  constructor(acceleration) {
    super();

    this.acceleration = acceleration;
  }

  update() {
    //TODO create a WASD template
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

    this.acceleration.acceleration.x = x_movement;
    this.acceleration.acceleration.y = y_movement;
    const isMoving = x_movement != 0 || y_movement != 0;
    this.acceleration.acceleration.magnitude = isMoving ? ACCEL : 0;
  }
}