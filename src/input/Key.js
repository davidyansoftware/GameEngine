import Pressable from "./Pressable";

/**
 * Handles logic for a key on the Keyboard
 * @extends Pressable
 */
export default class Key extends Pressable {
  constructor() {
    super();
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
    this._onPressDown.push(onKeyDown);
  }

  /**
   * Add a function to call on keyup event
   * @param {keyCallback} onKeyUp - Function to be called on keyup event
   */
  addKeyUp(onKeyUp) {
    this._onPressUp.push(onKeyUp);
  }
}