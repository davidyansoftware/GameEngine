/**
 * Transform store positional information about GameObjects
 */
class Transform {
  /**
   * Create a Transform
   * @param {number} x - The x-coordinate
   * @param {number} y - The y-coordinate
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

module.exports = Transform;
