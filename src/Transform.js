/**
 * Transform store positional information about GameObjects
 */
class Transform {
  /**
   * Create a Transform
   * @param {GameObject} gameObject - The GameObject this Transform is attached to
   * @param {number} x - The x-coordinate
   * @param {number} y - The y-coordinate
   * @param {number} rotation - The rotation in radians
   */
  constructor(gameObject, x = 0, y = 0, rotation = 0) {
    this.gameObject = gameObject;
    this._x = x;
    this._y = y;
    this._rotation = rotation;

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
  set absoluteX(value) {
    this._setAbsolutePosition(value, this.absoluteY);
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
  set absoluteY(value) {
    this._setAbsolutePosition(this.absoluteX, value);
  }

  /**
   * @type {number}
   */
  get absoluteRotation() {
    if (this._absoluteDirty) {
      this._cacheAbsolutePosition();
    }
    return this._absoluteRotation;
  }
  set absoluteRotation(value) {
    this.rotation = value - this.gameObject.parent.transform.absoluteRotation;
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

  /**
   * @type {number}
   */
  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    this._rotation = value;
    this._absoluteDirty = true;
  }

  _cacheAbsolutePosition() {
    const parentAbsoluteX = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteX
      : 0;
    const parentAbsoluteY = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteY
      : 0;
    const parentAbsoluteRotation = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteRotation
      : 0;

    // angle is negative to negate parent rotation
    const sin = Math.sin(-parentAbsoluteRotation);
    const cos = Math.cos(-parentAbsoluteRotation);

    this._absoluteX = this.x * cos - this.y * sin + parentAbsoluteX;
    this._absoluteY = this.x * sin + this.y * cos + parentAbsoluteY;
    this._absoluteRotation = parentAbsoluteRotation + this._rotation;

    this._absoluteDirty = false;
  }

  _setAbsolutePosition(x, y) {
    const parentAbsoluteX = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteX
      : 0;
    const parentAbsoluteY = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteY
      : 0;
    const parentAbsoluteRotation = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteRotation
      : 0;

    const offsetX = x - parentAbsoluteX;
    const offsetY = y - parentAbsoluteY;
    const sin = Math.sin(parentAbsoluteRotation);
    const cos = Math.cos(parentAbsoluteRotation);

    this.x = offsetX * cos - offsetY * sin;
    this.y = offsetX * sin + offsetY * cos;
  }
}

module.exports = Transform;
