/**
 * Transform store positional information about GameObjects
 */
class Transform {
  /**
   * Create a Transform
   * @param {GameObject} gameObject - The GameObject this Transform is attached to
   * @param {number} x - The x-coordinate
   * @param {number} y - The y-coordinate
   */
  constructor(gameObject, x = 0, y = 0) {
    this.gameObject = gameObject;
    this._x = x;
    this._y = y;

    this._cacheAbsolutePosition();
  }

  /**
   * @type {number}
   */
  get absoluteX() {
    if (this._absoluteDirty) {
      this._cacheAbsolutePosition();
    }
    return this._absoluteX;
  }

  /**
   * @type {number}
   */
  get absoluteY() {
    if (this._absoluteDirty) {
      this._cacheAbsolutePosition();
    }
    return this._absoluteY;
  }

  /**
   * @type {number}
   */
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this._absoluteDirty = true;
  }

  /**
   * @type {number}
   */
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this._absoluteDirty = true;
  }

  _cacheAbsolutePosition() {
    if (!this.gameObject.parent) {
      this._absoluteX = this.x;
      this._absoluteY = this.y;
      this._absoluteDirty = false;
    } else {
      this._absoluteX = this.gameObject.parent.transform.absoluteX + this.x;
      this._absoluteY = this.gameObject.parent.transform.absoluteY + this.y;
      this._absoluteDirty = false;
    }
  }
}

module.exports = Transform;
