const Component = require("../Component");

/**
 * A component for rendering text
 */
class Text extends Component {
  /**
   * Create a Text
   * @param {string} text - The text to be rendered
   */
  constructor(text) {
    super();

    this.text = text;
  }

  /**
   * Renders the text
   * @param {CanvasRenderingContext2D} ctx - The context to be rendered on
   */
  render(ctx) {
    ctx.fillText(this.text, 0, 0);
  }
}

module.exports = Text;
