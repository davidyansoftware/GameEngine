import GameObject from "./GameObject";
import now from "performance-now";

/**
 * GameLoop is responsible for updating game logic on every frame
 */
export default class GameLoop {
  gameObject: GameObject;
  private prevTime: DOMHighResTimeStamp;
  private currAnimationFrame: number;

  /**
   * Create a GameLoop
   * @param {GameObject} gameObject - The root GameObject to be updated
   */
  constructor(gameObject: GameObject) {
    this.gameObject = gameObject;
    this.prevTime = now();
    this.currAnimationFrame = requestAnimationFrame(currTime => {
      this.gameLoop(currTime);
    });
  }

  /**
   * gameLoop is responsible for calling the logic in the GameObject via update
   * gameLoop requests an animation frame and then recursively calls itself
   * @param {DOMHighResTimeStamp} - The current time passed by requestAnimationFrame
   * @return {number} The animation frame of the current request
   */
  gameLoop(currTime: DOMHighResTimeStamp): number {
    let deltaTime = (currTime - this.prevTime) / 1000;
    this.prevTime = currTime;

    this.gameObject.update(deltaTime);

    return requestAnimationFrame(currTime => {
      this.currAnimationFrame = this.gameLoop(currTime);
    });
  }
}