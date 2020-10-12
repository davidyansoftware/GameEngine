import GameObject from "./GameObject";
import Transform from "./Transform";

/**
 * A base class for components of GameObjects
 */
export default abstract class Component {
  _gameObject?: GameObject;

  /**
   * Create a component
   */
  constructor() {}

  /**
   * The GameObject this Component is attached to
   * @type {GameObject}
   */
  get gameObject(): GameObject | null {
    return this._gameObject || null;
  }

  /**
   * The Transform of the GameObject this Component is attached to
   * @type {Transform}
   */
  get transform(): Transform | null {
    return this.gameObject ? this.gameObject.transform : null;
  }

  /**
   * Runs game logic for this component every frame
   * To be implimented for individual components
   * Called by the GameLoop every frame
   * Can also be called manually
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number): void {}

  /**
   * Renders the component every frame
   * To be implimented for individual components
   * Called by Cameras every frame
   * Can also be called manually
   * @param {CanvasRenderingContext2D} ctx - The context to be rendered on
   */
  render(ctx: CanvasRenderingContext2D): void {}
}