/**
 * GameLoop is responsible for updating game logic on every frame
 */
class GameLoop {
  /**
   * Create a GameLoop
   * @param {GameObject} gameObject - The root GameObject to be updated
   */
  constructor(gameObject) {
    this.gameObject = gameObject;
    this._currAnimationFrame = this.gameLoop();
  }

  /**
   * @type {number}
   */
  get currAnimationFrame() {
    return this._currAnimationFrame;
  }

  /**
   * gameLoop is responsible for calling the logic in the GameObject via update
   * gameLoop requests an animation frame and then recursively calls itself
   * @return {number} The animation frame of the current request
   */
  gameLoop() {
    this.gameObject.update();

    return window.requestAnimationFrame(() => {
      this._currAnimationFrame = this.gameLoop();
    });
  }
}

module.exports = GameLoop;
