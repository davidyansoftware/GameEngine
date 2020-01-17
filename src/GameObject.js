const Composite = require("./Composite");

/**
 * GameObjects hold a collection of Components.
 * @extends Composite
 */
class GameObject extends Composite {
  /**
   * Create a GameObject
   */
  constructor() {
    super();

    this.components = [];
  }

  /**
   * Add a Component
   * @param {Component} component
   */
  addComponent(component) {
    this.components.push(component);
  }

  /**
   * Remove a Component if it exists
   * @param {Component} component
   */
  removeComponent(component) {
    let index = this.components.indexOf(component);
    if (index >= 0) {
      this.components.splice(index, 1);
    }
  }

  /**
   * Updates the GameObject
   * Called by the GameLoop every frame
   * Can also be called manually
   */
  update() {}
}

module.exports = GameObject;
