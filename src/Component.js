/**
 * A base class for components of GameObjects
 */
class Component {
  /**
   * Create a component
   */
  constructor() {}

  /**
   * The GameObject this Component is attached to
   * @type {GameObject}
   */
  get gameObject() {
    return this._gameObject || null;
  }

  /**
   * The Transform of the GameObject this Component is attached to
   * @type {Transform}
   */
  get transform() {
    return this.gameObject ? this.gameObject.transform : null;
  }

  /**
   * Runs game logic for this component every frame
   * To be implimented for individual components
   * Called by the GameLoop every frame
   * Can also be called manually
   * @param {number} currTime - The timestamp passed by requestAnimationFrame
   */
  update(currTime) {}

  /**
   * Renders the component every frame
   * To be implimented for individual components
   * Called by Cameras every frame
   * Can also be called manually
   * @param {CanvasRenderingContext2D} ctx - The context to be rendered on
   */
  render(ctx) {}
}

module.exports = Component;
