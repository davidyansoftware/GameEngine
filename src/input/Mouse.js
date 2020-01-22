/**
 * A class to handle mouse inputs
 */
class Mouse {
  /**
   * Create a Mouse object
   */
  constructor() {
    this._x = 0;
    this._y = 0;

    // this will not call _onMouseMove directly
    document.addEventListener("mousemove", event => {
      this._onMouseMove(event);
    });
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
    this._x = event.clientX;
    this._y = event.clientY;
  }
}

module.exports = Mouse;
