import Component from "../Component";
import Coordinate from "../coordinate/Coordinate";
import Cartesian from "../coordinate/Cartesian";

/**
 * A component for handling movement of GameObjects
 * @extends Component
 */
export default class Acceleration extends Component {
  acceleration: Coordinate;
  maxSpeed: number;
  drag: number;

  private velocity: Coordinate = new Cartesian(0, 0);

  /**
   *
   * @param {Coordinate} acceleration - Pixels to accelerate every second
   * @param {number} maxSpeed - The maximum magnitude of velocity
   * @param {number} drag - Factor to decrease speed when not accelerating
   */
  constructor(acceleration: Coordinate, maxSpeed: number = -1, drag: number = 0) {
    super();

    this.acceleration = acceleration;
    this.maxSpeed = maxSpeed;
    this.drag = drag;
  }

  /**
   * Recalculates velocity on every frame, then updates position
   * This acceleration will not scale directly with deltaTime,
   * as acceleration and drag get applied on every tick
   * 
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number): void {
    if (this.gameObject == null) {
      return;
    }

    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    const hasMaxSpeed = this.maxSpeed > 0;
    const isExceedingMaxSpeed = this.velocity.magnitude > this.maxSpeed;
    if (hasMaxSpeed && isExceedingMaxSpeed) {
        this.velocity.magnitude = this.maxSpeed
    }

    const isAccelerating = this.acceleration.magnitude > 0;
    if (!isAccelerating) {
        this.velocity.magnitude -= this.velocity.magnitude * this.drag;
    }

    this.gameObject.transform.x += this.velocity.x * deltaTime;
    this.gameObject.transform.y += this.velocity.y * deltaTime;
  }
}