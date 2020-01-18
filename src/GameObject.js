const Transform = require("./Transform");

/**
 * GameObjects store game entities and logic
 * GameObjects are composites that propagate call to children GameObjects
 * GameObjects hold Components which handle game logic
 */
class GameObject {
  /**
   * Create a GameObject
   * @param {Transform} transform - The Transform for this GameObject
   */
  constructor(transform = new Transform()) {
    this.transform = transform;

    this.gameObjects = [];
    this.components = [];
  }

  /**
   * Add a child GameObject
   * @param {GameObject} gameObject - The child game object
   */
  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  /**
   * Remove a child GameObject if it exists
   * @param {GameObject} gameObject
   */
  removeGameObject(gameObject) {
    let index = this.gameObjects.indexOf(gameObject);
    if (index >= 0) {
      this.gameObjects.splice(index, 1);
    }
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
   * Updates the GameObject and all children GameObjects by updating all components
   * Game logic is handled within component updates
   * Called by the GameLoop every frame
   * Can also be called manually
   */
  update() {
    this.components.forEach(component => {
      component.update();
    });
    this.gameObjects.forEach(gameObject => {
      gameObject.update();
    });
  }
}

module.exports = GameObject;
