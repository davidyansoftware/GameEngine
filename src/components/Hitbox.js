const Component = require("../Component");

/**
 * A component for determining if GameObjects are colliding
 * @extends Component
 */
class Hitbox extends Component {
  constructor(shapeType) {
    super();

    this.shapeType = shapeType;
  }

  //isCollingWith(hurtbox) {
  //  return this.shape.isCollingWith(this, hurtbox);
  //}
}

module.exports = Hitbox;
