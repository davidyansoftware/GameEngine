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
  private onHitEnter: Array<HitCallback>;
  private onHitExit: Array<HitCallback>;

  private prevHitting: Set<Hitbox>;

  /**
   * The shape of this Hitbox
   * @param {ShapeType} shape
   */
  constructor(hurtboxes: Array<Hitbox> = []) {
    super();

    this.hurtboxes = hurtboxes;
    this.onHit = [];
    this.onHitEnter = [];
    this.onHitExit = [];

    this.prevHitting = new Set<Hitbox>();
  }

  /**
   * Checks for collisions every frame and handles callbacks
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number) {
    for (const hurtbox of this.hurtboxes) {
      const isHitting = this.transform?.isHitting(hurtbox.transform!);
      const wasHitting = this.prevHitting.has(hurtbox);
      if (isHitting) {
        if (!wasHitting) {
          this.prevHitting.add(hurtbox);
          for (const callback of this.onHitEnter) {
            callback(this, hurtbox);
          }
        }
        for (const callback of this.onHit) {
          callback(this, hurtbox);
        }
      } else if (wasHitting) {
        this.prevHitting.delete(hurtbox);
        for (const callback of this.onHitExit) {
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

  /**
   * A callback function for OnHit
   * @param {hitCallback}
   */
  addOnHitEnter(hitCallback: HitCallback) {
    this.onHitEnter.push(hitCallback);
  }

  /**
   * A callback function for OnHit
   * @param {hitCallback}
   */
  addOnHitExit(hitCallback: HitCallback) {
    this.onHitExit.push(hitCallback);
  }
    

}