import Component from "../Component";
import GameObject from "../GameObject";

/**
 * A component for rendering GameObjects to canvas context
 * @extends Component
 */
export default class Camera extends Component {
  _canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  root: GameObject;

  private _width: number;
  private _height: number;
  private _x: number;
  private _y: number;

  private backgroundColor: string | null;

  /**
   *
   * @param {HTMLCanvasElement} canvas - The canvas to render to
   * @param {GameObject} root - The GameObject to be rendered
   */
  constructor(canvas: HTMLCanvasElement, root: GameObject, backgroundColor: string | null) {
    super();

    this._canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (ctx == null) {
      //TODO test this
      throw new Error("Canvas does not have CanvasRenderingContext2D");
    }
    this.ctx = ctx;
    this.root = root;

    //TODO test this
    this.backgroundColor = backgroundColor;

    this._width = canvas.width;
    this._height = canvas.height;
    this._x = this._width / 2;
    this._y = this._height / 2;
    this.ctx.translate(this._x, this._y);
  }

  /**
   * Renders to context every frame
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number): void {
    if (this.transform == null) {
      //TODO test this
      return;
    }

    this.ctx.clearRect(-this._x, -this._y, this._width, this._height);
    //TODO test this
    if (this.backgroundColor) {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.fillRect(-this._x, -this._y, this._width, this._height);
    }

    this.ctx.save();

    const offsetX = this.root.transform.absoluteX - this.transform.absoluteX;
    const offsetY = this.root.transform.absoluteY - this.transform.absoluteY;
    const offsetRotation =
      this.root.transform.absoluteRotation - this.transform.absoluteRotation;

    this.ctx.rotate(offsetRotation);
    this.ctx.translate(offsetX, -offsetY);

    this.root.render(this.ctx);

    this.ctx.restore();
  }
}