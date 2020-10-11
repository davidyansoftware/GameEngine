import Component from "../Component";

/**
 * A component for determining if GameObjects are colliding
 * @extends Component
 */
export default class Hitbox extends Component {
  /**
   * The shape of this Hitbox
   * @param {Shape} shape
   */
  constructor(shape, hurtboxes = []) {
    super();

    this.shape = shape;
    this._hurtboxes = hurtboxes;

    this._onHit = [];

    this._isHitting = {};
  }

  /**
   * Checks for collisions every frame and handles callbacks
   * @param {*} hurtbox
   */
  update(deltaTime) {
    for (const hurtbox of this._hurtboxes) {
      const isHitting = this.shape.isHitting(this, hurtbox);
      if (isHitting) {
        this._isHitting[hurtbox] = true;
        hurtbox._isHitting[this] = true;
        for (const callback of this._onHit) {
          callback(this, hurtbox);
        }
      } else {
        this._isHitting[hurtbox] = false;
        hurtbox._isHitting[this] = false;
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
  isHitting(hurtbox) {
    return this._isHitting[hurtbox];
  }
}