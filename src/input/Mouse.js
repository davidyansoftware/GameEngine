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
    const rect = this.camera._canvas.getBoundingClientRect();
    this._x = event.clientX - Math.round(rect.left - 0.5) - this.camera._x;
    this._y = -(event.clientY - Math.round(rect.top - 0.5) - this.camera._y);
  }
}

module.exports = Mouse;
