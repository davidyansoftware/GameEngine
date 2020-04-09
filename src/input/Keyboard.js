const Input = require("./Input");
const Key = require("./Key");

/**
 * Represents keys on the user's keyboard
 * @extends Input
 */
class Keyboard extends Input {
  /**
   * Create a Keyboard object
   */
  constructor() {
    super("keydown", "keyup", "keyCode");
  }

  /**
   * Gets the Key cooresponding to this keycode
   * @param {number} keyCode - The javascript keycode for this Key
   */
  getKey(keyCode) {
    let key = this._pressables[keyCode];
    if (key) {
      return key;
    }

    key = new Key();
    this._pressables[keyCode] = key;
    return key;
  }
}

module.exports = Keyboard;
