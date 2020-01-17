const Composite = require("./Composite.js");

/**
 * GameLoop is a composite that stores GameObjects
 * The loop is responsible for handling updating game logic
 * @extends Composite
 */
class GameLoop extends Composite {
  constructor() {
    super();

    this.currAnimationFrame = this.gameLoop();
  }

  /**
   * gameLoop requests an animation frame and then recursively calls itself.
   * @return {number} The animation frame of the current request
   */
  gameLoop() {
    return window.requestAnimationFrame(() => {
      this.currAnimationFrame = this.gameLoop;
    });
  }
}

module.exports = GameLoop;
