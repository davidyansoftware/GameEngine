import Input from "./Input";
import MouseButton from "./MouseButton";

/**
 * A class to handle mouse inputs
 * @extends Input
 */
export default class Mouse extends Input {
  /**
   * Create a Mouse object
   */
  //TODO pass flag to disabledDefault on contextmenu
  constructor(eventTarget, camera, disableContextMenu = false) {
    super(eventTarget, "mousedown", "mouseup", "button");

    this._x = 0;
    this._y = 0;

    this.camera = camera;

    // this will not call _onMouseMove directly
    eventTarget.addEventListener("mousemove", event => {
      this._onMouseMove(event);
    });

    //TODO test this
    if (disableContextMenu) {
      eventTarget.addEventListener("contextmenu", event => {
        event.preventDefault();
      });
    }
  }

  /**
   * Gets the MouseButton cooresponding to this mouse event
   * @param {number} mouseButton - The button code for this mouse button
   */
  getButton(buttonCode) {
    let button = this._pressables[buttonCode];
    if (button) {
      return button;
    }

    button = new MouseButton();
    this._pressables[buttonCode] = button;
    return button;
  }

  /**
   * @type {number}
   */
  get x() {
    return this._x + this.camera.transform.position.absoluteX;
  }

  /**
   * @type {number}
   */
  get y() {
    return this._y + this.camera.transform.position.absoluteY;
  }

  _onMouseMove(event) {
    const rect = this.camera._canvas.getBoundingClientRect();
    this._x = event.clientX - Math.round(rect.left - 0.5) - this.camera._x;
    this._y = -(event.clientY - Math.round(rect.top - 0.5) - this.camera._y);
  }
}