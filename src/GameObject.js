const Transform = require("./Transform");

/**
 * GameObjects store game entities and logic
 * GameObjects are composites that propagate call to children GameObjects
 * GameObjects hold Components which handle game logic
 */
class GameObject {
  /**
   * Create a GameObject
   * @param {number} x - The x-coordinate for the GameObject's Transform
   * @param {number} y - The y-coordinate for the GameObject's Transform
   * @param {number} rotation - The rotation for the GameObject's Transform
   */
  constructor(x = 0, y = 0, rotation = 0) {
    this.transform = new Transform(this, x, y, rotation);

    this.gameObjects = [];
    this.components = [];
  }

  /**
   * Add a child GameObject
   * @param {GameObject} gameObject - The child game object
   * @param {boolean} maintainAbsolutePosition - GameObject should maintain its absolute position
   * @param {boolean} maintainAbsoluteRotation  - Gamebject should maintain its absolute rotation
   */
  addGameObject(
    gameObject,
    maintainAbsolutePosition = false,
    maintainAbsoluteRotation = false
  ) {
    let prevAbsoluteX;
    let prevAbsoluteY;
    let prevAbsoluteRotation;
    if (gameObject.parent) {
      if (maintainAbsolutePosition) {
        prevAbsoluteX = gameObject.transform.absoluteX;
        prevAbsoluteY = gameObject.transform.absoluteY;
      }
      if (maintainAbsoluteRotation) {
        prevAbsoluteRotation = gameObject.transform.absoluteRotation;
      }
      gameObject.parent.removeGameObject(gameObject);
    }
    gameObject.parent = this;
    this.gameObjects.push(gameObject);

    if (gameObject.parent && maintainAbsolutePosition) {
      gameObject.transform.absoluteX = prevAbsoluteX;
      gameObject.transform.absoluteY = prevAbsoluteY;
    }
    if (gameObject.parent && maintainAbsoluteRotation) {
      gameObject.transform.absoluteRotation = prevAbsoluteRotation;
    }

    gameObject.transform._cacheAbsolutePosition();
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

    gameObject.transform._cacheAbsolutePosition();
  }

  /**
   * Add a Component
   * @param {Component} component - Component to be added
   */
  addComponent(component) {
    component.gameObject = this;
    this.components.push(component);
  }

  /**
   * Remove a Component if it exists
   * @param {Component} component - Component to be removed
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
   * @param {number} currTime - The timestamp passed by requestAnimationFrame
   */
  update(currTime) {
    this.components.forEach(component => {
      component.update(currTime);
    });
    this.gameObjects.forEach(gameObject => {
      gameObject.update(currTime);
    });
  }

  /**
   * Renders the GameObject and all children GameObjects by rendering all components
   * Canvas rendering is handled within component renders
   * Called by Cameras every frame
   * Can also be called manually
   * @param {CanvasRenderingContext2D} ctx - The context to be rendered on
   */
  render(ctx) {
    ctx.save();
    ctx.translate(this.transform.x, this.transform.y);
    ctx.rotate(this.transform.rotation);

    this.components.forEach(component => {
      component.render(ctx);
    });
    this.gameObjects.forEach(gameObject => {
      gameObject.render(ctx);
    });

    ctx.restore();
  }
}

module.exports = GameObject;
