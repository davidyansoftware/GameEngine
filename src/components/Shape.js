const Component = require("../Component");

/**
 * A component that renders a ShapeType
 * @extends Component
 */
class Shape extends Component {
  /**
   * The type of shape to render
   * @param {ShapeType} shapeType
   */
  constructor(shapeType) {
    super();

    this.shapeType = shapeType;
  }

  render(ctx) {
    ctx.strokeStyle = "black";
    this.shapeType.render(ctx);
  }
}

module.exports = Shape;
