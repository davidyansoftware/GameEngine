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

    document.addEventListener("mousemove", this._onMouseMove);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  _onMouseMove(event) {
    this._x = event.clientX;
    this._y = event.clientY;
  }
}

module.exports = Mouse;
