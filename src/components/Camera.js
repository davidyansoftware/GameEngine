const Component = require("../Component");

/**
 * A component for rendering GameObjects to canvas context
 * @extends Component
 */
class Camera extends Component {
  /**
   *
   * @param {HTMLCanvasElement} canvas - The canvas to render to
   * @param {GameObject} root - The GameObject to be rendered
   */
  constructor(canvas, root) {
    super();

    this._canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.root = root;

    const width = canvas.width;
    const height = canvas.height;
    this.ctx.translate(width / 2, height / 2);
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
