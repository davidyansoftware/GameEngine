const Component = require("../Component");

class Shape extends Component {
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
