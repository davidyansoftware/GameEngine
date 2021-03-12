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

  /**
   * The shape of this Hitbox
   * @param {ShapeType} shape
   */
  constructor(hurtboxes: Array<Hitbox> = []) {
    super();

    this.hurtboxes = hurtboxes;
    this.onHit = [];
  }

  /**
   * Checks for collisions every frame and handles callbacks
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number) {
    for (const hurtbox of this.hurtboxes) {
      const isHitting = this.transform?.isHitting(hurtbox.transform!);
      if (isHitting) {
        for (const callback of this.onHit) {
          callback(this, hurtbox);
        }
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

}