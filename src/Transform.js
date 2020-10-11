/**
 * Transform store positional information about GameObjects
 */
export default class Transform {
  /**
   * Create a Transform
   * @param {GameObject} gameObject - The GameObject this Transform is attached to
   * @param {number} x - The x-coordinate
   * @param {number} y - The y-coordinate
   * @param {number} rotation - The rotation in radians
   */
  constructor(gameObject, x = 0, y = 0, rotation = 0) {
    this._gameObject = gameObject;
    this._x = x;
    this._y = y;
    this._rotation = rotation;

    this._cacheAbsolutePosition();
  }

  /**
   * The GameObject this Transform is attached to
   * @type {GameObject}
   */
  get gameObject() {
    return this._gameObject;
  }

  /**
   * The Transform of this GameObject
   * @type {Transform}
   */
  get transform() {
    return this;
  }

  /**
   * The x-coordinate of the GameObject
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
   * The y-coordinate of the GameObject
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
   * The rotation of the GameObject
   * @type {number}
   */
  get rotation() {
    return this._rotation;
  }
  set rotation(value) {
    this._rotation = value;
    this._absoluteDirty = true;
  }

  /**
   * The x-coordinate relative to the root GameObject
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
   * The y-coordinate relative to the root GameObject
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
   * The rotation relative to the root GameObject
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