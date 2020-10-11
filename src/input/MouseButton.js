import Pressable from "./Pressable";

/**
 * Handles logic for a mouse button
 * @extends Pressable
 */
export default class MouseButton extends Pressable {
  constructor() {
    super();
  }

  /**
   * This callback type is for key event callbacks
   *
   * @callback mouseCallback
   * @param{MouseEvent} event
   */

  /**
   * Add a function to call on keydown event
   * @param {mouseCallback} onMouseDown - Function to be called on keydown event
   */
  addMouseDown(onMouseDown) {
    this._onPressDown.push(onMouseDown);
  }

  /**
   * Add a function to call on keyup event
   * @param {mouseCallback} onMouseUp - Function to be called on keyup event
   */
  addMouseUp(onMouseUp) {
    this._onPressUp.push(onMouseUp);
  }
}