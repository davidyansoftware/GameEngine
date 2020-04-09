const MouseButton = require("./MouseButton");

/**
 * A class to handle mouse inputs
 */
class Mouse {
  /**
   * Create a Mouse object
   */
  constructor(camera) {
    this._x = 0;
    this._y = 0;

    this.camera = camera;

    this._buttons = {};

    // this will not call _onMouseMove directly
    document.addEventListener("mousemove", event => {
      this._onMouseMove(event);
    });

    document.addEventListener("onmousedown", event => {
      const buttonCode = event.button;
      const button = this._buttons[buttonCode];
      if (button) {
        button._pressed = true;
      }

      for (const buttonCode in this._buttons) {
        const button = this._buttons[buttonCode];
        for (const callback of button._onPressDown) {
          callback(event);
        }
      }
    });

    document.addEventListener("onmouseup", event => {
      const buttonCode = event.button;
      const button = this._buttons[buttonCode];
      if (button) {
        button._pressed = false;
      }

      for (const buttonCode in this._buttons) {
        const button = this._buttons[buttonCode];
        for (const callback of button._onPressUp) {
          callback(event);
        }
      }
    });
  }

  /**
   * Gets the MouseButton cooresponding to this mouse event
   * @param {number} mouseButton - The button code for this mouse button
   */
  getButton(buttonCode) {
    let button = this._buttons[buttonCode];
    if (button) {
      return button;
    }

    button = new MouseButton();
    this._buttons[buttonCode] = button;
    return button;
  }

  /**
   * @type {number}
   */
  get x() {
    return this._x;
  }

  /**
   * @type {number}
   */
  get y() {
    return this._y;
  }

  _onMouseMove(event) {
    const rect = this.camera._canvas.getBoundingClientRect();
    this._x = event.clientX - Math.round(rect.left - 0.5) - this.camera._x;
    this._y = -(event.clientY - Math.round(rect.top - 0.5) - this.camera._y);
  }
}

module.exports = Mouse;
