const Component = require("../Component");

class Camera extends Component {
  constructor(ctx, root) {
    super();

    this.ctx = ctx;
    this.root = root;
  }

  update() {
    this.root.render(this.ctx);
  }
}

module.exports = Camera;
