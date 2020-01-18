const Component = require("../Component");

/**
 * A component for rendering GameObjects to canvas context
 * @extends Component
 */
class Camera extends Component {
  /**
   *
   * @param {CanvasRenderingContext2D} ctx - The context to render to
   * @param {GameObject} root - The GameObject to be rendered
   */
  constructor(ctx, root) {
    super();

    this.ctx = ctx;
    this.root = root;
  }

  /**
   * Renders to context every frame
   * @param {number} currTime - The timestamp passed by requestAnimationFrame
   */
  update() {
    this.root.render(this.ctx);
  }
}

module.exports = Camera;
