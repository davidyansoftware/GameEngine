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
   */
  update() {}
}

module.exports = Component;
