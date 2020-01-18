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
    this.x = x;
    this.y = y;

    this._setAbsolutePosition();
  }

  get absoluteX() {
    if (this._absoluteDirty) {
      _setAbsolutePosition();
    }
    return this._absoluteX;
  }

  get absoluteY() {
    if (this._absoluteDirty) {
      _setAbsolutePosition();
    }
    return this._absoluteY;
  }

  // cache absolute position
  _setAbsolutePosition() {
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
