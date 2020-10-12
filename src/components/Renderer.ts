import Component from "../Component";
import Shape from "../Shape";

/**
 * A component that renders a shape
 * @extends Component
 */
export default class Renderer extends Component {
  shape: Shape;

  /**
   * The type of shape to render
   * @param {Shape} shape
   */
  constructor(shape: Shape) {
    super();

    this.shape = shape;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "black";
    this.shape.render(ctx);
  }
}