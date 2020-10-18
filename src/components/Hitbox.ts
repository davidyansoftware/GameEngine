import Component from "../Component";

/**
 * A callback function for handling on hit events
 * @callback HitCallback
 * @param {GameObject} self
 * @param {GameObject} other
 */
type HitCallback = (self: Hitbox, other: Hitbox) => void;

/**
 * A component for determining if GameObjects are colliding
 * @extends Component
 */
export default class Hitbox extends Component {
  private hurtboxes: Array<Hitbox>;
  private onHit: Array<HitCallback>;

  private currHitting: Set<Hitbox>;

  /**
   * The shape of this Hitbox
   * @param {ShapeType} shape
   */
  constructor(hurtboxes: Array<Hitbox> = []) {
    super();

    this.hurtboxes = hurtboxes;
    this.onHit = [];

    this.currHitting = new Set<Hitbox>();
  }

  /**
   * Checks for collisions every frame and handles callbacks
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number) {
    for (const hurtbox of this.hurtboxes) {
      const isHitting = this.transform?.shape.isHitting(this, hurtbox);
      if (isHitting) {
        this.currHitting.add(hurtbox);
        hurtbox.currHitting.add(this);
        for (const callback of this.onHit) {
          callback(this, hurtbox);
        }
      } else {
        this.currHitting.delete(hurtbox);
        hurtbox.currHitting.delete(this);
      }
    }
  }

  /**
   * A callback function for OnHit
   * @param {hitCallback}
   */
  addOnHit(hitCallback: HitCallback) {
    this.onHit.push(hitCallback);
  }

  /**
   * Is this colliding with another Hitbox
   * @param {Hitbox} other
   */
  isHitting(other: Hitbox) {
    return this.currHitting.has(other);
  }
}