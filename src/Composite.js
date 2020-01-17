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
   * Add a GameObject to the Composite
   * @param {GameObject} gameObject - The child game object
   */
  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  /**
   * Remove a GameObject from the Composite if it is a child
   * @param {GameObject} gameObject
   */
  removeGameObject(gameObject) {
    let index = this.gameObjects.indexOf(gameObject);
    if (index >= 0) {
      this.gameObjects.splice(index, 1);
    }
  }
}

module.exports = Composite;
