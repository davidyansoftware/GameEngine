const Composite = require("../src/Composite");

/**
 * @extends Composite
 */
class GameObject extends Composite {
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
}

module.exports = GameObject;
