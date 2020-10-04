const Component = require("../Component");

/**
 * A component that renders a shape
 * @extends Component
 */
class Renderer extends Component {
  /**
   * The type of shape to render
   * @param {Shape} shape
   */
  constructor(shape) {
    super();

    this.shape = shape;
  }

  render(ctx) {
    ctx.strokeStyle = "black";
    this.shape.render(ctx);
  }
}

module.exports = Renderer;
