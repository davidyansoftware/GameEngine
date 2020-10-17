import Component from "../Component";

/**
 * A component that renders a shape
 * @extends Component
 */
export default class Renderer extends Component {

  /**
   * The type of shape to render
   * @param {Shape} shape
   */
  constructor() {
    super();
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "black";
    this.transform?.shape.render(ctx);
  }
}