/**
 * Handles logic for oressable input
 */
class Pressable {
  constructor() {
    this._pressed = false;

    this._onPressDown = [];
    this._onPressUp = [];
  }

  /**
   * If this key is currently pressed
   * @type {boolean}
   */
  get pressed() {
    return this._pressed;
  }
}

module.exports = Pressable;
