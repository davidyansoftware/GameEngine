import Component from "../Component";

/**
 * A component for rendering text
 * @extends Component
 */
export default class Text extends Component {
  text: string;
  /**
   * Create a Text
   * @param {string} text - The text to be rendered
   */
  constructor(text: string) {
    super();

    this.text = text;
  }

  /**
   * Renders the text
   * @param {CanvasRenderingContext2D} ctx - The context to be rendered on
   */
  render(ctx: CanvasRenderingContext2D): void {
    ctx.font = "12px serif";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(this.text, 0, 0);
  }
}