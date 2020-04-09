const Key = require("./Key");

/**
 * Represents keys on the user's keyboard
 */
class Keyboard {
  constructor() {
    this._keys = {};

    document.addEventListener("keydown", event => {
      const keyCode = event.keyCode;
      const key = this._keys[keyCode];
      if (key) {
        key._pressed = true;
      }

      for (const keyCode in this._keys) {
        const key = this._keys[keyCode];
        for (const callback of key._onPressDown) {
          callback(event);
        }
      }
    });

    document.addEventListener("keyup", event => {
      const keyCode = event.keyCode;
      const key = this._keys[keyCode];
      if (key) {
        key._pressed = false;
      }

      for (const keyCode in this._keys) {
        const key = this._keys[keyCode];
        for (const callback of key._onPressUp) {
          callback(event);
        }
      }
    });
  }

  /**
   * Gets the Key cooresponding to this keycode
   * @param {number} keyCode - The javascript keycode for this Key
   */
  getKey(keyCode) {
    let key = this._keys[keyCode];
    if (key) {
      return key;
    }

    key = new Key();
    this._keys[keyCode] = key;
    return key;
  }
}

module.exports = Keyboard;
