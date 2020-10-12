import Component from "../Component";

/**
 * A component for handling movement of GameObjects
 * @extends Component
 */
export default class Physics extends Component {
  x: number;
  y: number;

  /**
   *
   * @param {number} x - Pixels to move horizontally every second
   * @param {number} y - Pixels to move vertically every second
   */
  constructor(x: number, y: number) {
    super();

    this.x = x;
    this.y = y;
  }

  /**
   * Updates position every frame
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number): void {
    if (this.gameObject == null) {
      return;
    }

    this.gameObject.transform.x += this.x * deltaTime;
    this.gameObject.transform.y += this.y * deltaTime;
  }
}