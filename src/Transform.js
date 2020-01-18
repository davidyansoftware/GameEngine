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
    this.x = value - this.gameObject.parent.transform.absoluteX;
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
    this.y = value - this.gameObject.parent.transform.absoluteY;
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
    const baseX = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteX
      : 0;
    const baseY = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteY
      : 0;
    const baseRotation = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteRotation
      : 0;

    this._absoluteX =
      baseX + this.x * Math.cos(baseRotation) - this.y * Math.sin(baseRotation);
    this._absoluteY =
      baseY + this.x * Math.sin(baseRotation) + this.y * Math.cos(baseRotation);
    this._absoluteRotation = baseRotation + this.rotation;
    this._absoluteDirty = false;
  }
}

module.exports = Transform;
