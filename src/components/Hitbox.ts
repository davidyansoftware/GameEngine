import Component from "../Component";
import GameObject from "../GameObject";
import Shape from "../Shape";

/**
 * A callback function for handling on hit events
 * @callback HitCallback
 * @param {GameObject} self
 * @param {GameObject} hurtbox
 */
type HitCallback = (self: Hitbox, hurtbox: Hitbox) => void;

/**
 * A component for determining if GameObjects are colliding
 * @extends Component
 */
export default class Hitbox extends Component {
  shape: Shape;
  _hurtboxes: Array<Hitbox>;
  _onHit: Array<HitCallback>;

  _isHitting: Set<Hitbox>;

  /**
   * The shape of this Hitbox
   * @param {Shape} shape
   */
  constructor(shape: Shape, hurtboxes: Array<Hitbox> = []) {
    super();

    this.shape = shape;
    this._hurtboxes = hurtboxes;

    this._onHit = [];

    this._isHitting = new Set<Hitbox>();
  }

  /**
   * Checks for collisions every frame and handles callbacks
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number) {
    for (const hurtbox of this._hurtboxes) {
      const isHitting = this.shape.isHitting(this, hurtbox);
      if (isHitting) {
        this._isHitting.add(hurtbox);
        hurtbox._isHitting.add(this);
        for (const callback of this._onHit) {
          callback(this, hurtbox);
        }
      } else {
        this._isHitting.delete(hurtbox);
        hurtbox._isHitting.delete(this);
      }
    }
  }

  /**
   * A callback function for OnHit
   * @param {hitCallback}
   */
  addOnHit(hitCallback: HitCallback) {
    this._onHit.push(hitCallback);
  }

  /**
   * Is this colliding with another Hitbox
   * @param {Hitbox} hurtbox
   */
  isHitting(hurtbox: Hitbox) {
    return this._isHitting.has(hurtbox);
  }
}