/**
 * Handles logic for a key on the Keyboard
 */
class Key {
  constructor() {
    this._pressed = false;

    this._onKeyDown = [];
    this._onKeyUp = [];
  }

  /**
   * If this key is currently pressed
   * @type {boolean}
   */
  get pressed() {
    return this._pressed;
  }

  /**
   * This callback type is for key event callbacks
   *
   * @callback keyCallback
   * @param{KeyboardEvent} event
   */

  /**
   * Add a function to call on keydown event
   * @param {keyCallback} onKeyDown - Function to be called on keydown event
   */
  addKeyDown(onKeyDown) {
    this._onKeyDown.push(onKeyDown);
  }

  /**
   * Add a function to call on keyup event
   * @param {keyCallback} onKeyUp - Function to be called on keyup event
   */
  addKeyUp(onKeyUp) {
    this._onKeyUp.push(onKeyUp);
  }
}

module.exports = Key;
