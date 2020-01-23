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
    this._x = this._width / 2;
    this._y = this._height / 2;
    this.ctx.translate(this._x, this._y);
  }

  /**
   * Renders to context every frame
   * @param {number} currTime - The timestamp passed by requestAnimationFrame
   */
  update() {
    this.ctx.clearRect(-this._x, -this._y, this._width, this._height);

    this.ctx.save();

    const offsetX =
      this.root.transform.absoluteX - this.gameObject.transform.absoluteX;
    const offsetY =
      this.root.transform.absoluteY - this.gameObject.transform.absoluteY;
    const offsetRotation =
      this.root.transform.absoluteRotation -
      this.gameObject.transform.absoluteRotation;

    this.ctx.translate(offsetX, offsetY);
    this.ctx.rotate(offsetRotation);

    this.root.render(this.ctx);

    this.ctx.restore();
  }
}

module.exports = Camera;
