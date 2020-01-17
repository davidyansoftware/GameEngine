/**
 * Base class for composite pattern. Will manage update and render calls for itself and child GameObjects.
 */
class Composite {
  /**
   * Create a composite.
   */
  constructor() {
    this.gameObjects = [];
  }

  /**
   * Add a game object to the composite.
   * @param {Composite} gameObject - The child game object
   */
  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }
}

module.exports = Composite;
