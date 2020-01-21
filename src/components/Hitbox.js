const Component = require("../Component");

class Hitbox extends Component {
  constructor(shape) {
    super();

    this.shape = shape;
  }

  //isCollingWith(hurtbox) {
  //  return this.shape.isCollingWith(this, hurtbox);
  //}
}

module.exports = Hitbox;
