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

    this._width = canvas.width;
    this._height = canvas.height;
    this.ctx.translate(this._width / 2, this._height / 2);
  }

  /**
   * Renders to context every frame
   * @param {number} currTime - The timestamp passed by requestAnimationFrame
   */
  update() {
    this.ctx.clearRect(0, 0, this._width, this._height);

    this.root.render(this.ctx);
  }
}

module.exports = Camera;
