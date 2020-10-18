import Component from "../Component";

/**
 * A component that renders a shape
 * @extends Component
 */
export default class Renderer extends Component {
  fill: boolean = false;
  fillStyle: string = "#000";

  constructor(fillStyle: string) {
    super();

    if (fillStyle) {
      this.fill = true;
      this.fillStyle = fillStyle;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "black";
    ctx.fillStyle = this.fillStyle;
    this.transform?.shape.render(ctx, this.fill);
  }
}