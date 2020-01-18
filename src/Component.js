/**
 * A base class for components of GameObjects
 */
class Component {
  /**
   * Create a component
   */
  constructor() {}

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
  render() {}
}

module.exports = Component;
