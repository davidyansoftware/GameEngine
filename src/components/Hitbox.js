const Component = require("../Component");
const GameObject = require("../GameObject");

/**
 * A component for determining if GameObjects are colliding
 * @extends Component
 */
class Hitbox extends Component {
  /**
   * The shape of this Hitbox
   * @param {ShapeType} shapeType
   */
  constructor(shapeType, hurtboxes) {
    super();

    this.shapeType = shapeType;
    this._hurtboxes = hurtboxes;

    this._onHit = [];

    //this._currentlyHitting = {};
  }

  /**
   * Checks for collisions every frame and handles callbacks
   * @param {*} hurtbox
   */
  update(deltaTime) {
    for (const hurtbox in this._hurtboxes) {
      if (this.isCollidingWith(this, hurtbox)) {
        for (const callback of this._onHit) {
          callback(this, hurtbox);
        }
      }
    }
  }

  /**
   * A callback function for handling on hit events
   * @callback hitCallback
   * @param {GameObject} self
   * @param {GameObject} hurtbox
   */

  /**
   * A callback function for OnHit
   * @param {hitCallback}
   */
  addOnHit(hitCallback) {
    this._onHit.push(hitCallback);
  }

  /**
   * Is this colliding with another Hitbox
   * @param {Hitbox} hurtbox
   */
  isCollidingWith(hurtbox) {
    return this.shapeType.isCollidingWith(this, hurtbox);
  }
}

module.exports = Hitbox;
