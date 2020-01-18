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
  }
}

module.exports = Transform;
