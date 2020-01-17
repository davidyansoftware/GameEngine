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
   * Add a component
   * @param {Component} component
   */
  addComponent(component) {
    this.components.push(component);
  }
}

module.exports = GameObject;
