const Component = require("../Component");

/**
 * A component for handling movement of GameObjects
 * @extends Component
 */
class Physics extends Component {
  /**
   *
   * @param {number} x - Pixels to move horizontally every second
   * @param {number} y - Pixels to move vertically every second
   */
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  /**
   * Updates position every frame
   * @param {number} currTime - The timestamp passed by requestAnimationFrame
   */
  update() {
    this.gameObject.transform.x += this.x;
    this.gameObject.transform.y += this.y;
  }
}

module.exports = Physics;
