const Component = require("../Component");

class Text extends Component {
  constructor(text) {
    super();

    this.text = text;
  }

  render(ctx) {
    ctx.fillText(this.text, 0, 0);
  }
}

module.exports = Text;
