import CircleTransform from "./CircleTransform";
import RectangleTransform from "./RectangleTransform";
import GameObject from "./GameObject";
import Shape from "./Shape";
import Position from "./Position";

/**
 * Transform store positional information about GameObjects
 */
export default abstract class Transform {
  shape: Shape;
  position: Position;

  private _gameObject: GameObject;

  /**
   * Create a Transform
   * @param {GameObject} gameObject - The GameObject this Transform is attached to
   * @param {number} x - The x-coordinate
   * @param {number} y - The y-coordinate
   */
  constructor(gameObject: GameObject, x: number = 0, y: number = 0, shape: Shape) {
    this._gameObject = gameObject;
    this.position = new Position(this, x, y);
    this.shape = shape;
  }

  abstract isHitting(other: Transform): boolean;
  abstract _isHittingCircle(other: CircleTransform): boolean;
  abstract _isHittingRectangle(other: RectangleTransform): boolean;

  abstract _onPositionChange(): void;

  _positionChanged() {
    this._onPositionChange();
    this.gameObject.gameObjects.forEach((gameObject) => {
      gameObject.transform._positionChanged();
    });
  }

  /**
   * The GameObject this Transform is attached to
   * @type {GameObject}
   */
  get gameObject(): GameObject {
    return this._gameObject;
  }

  /**
   * The Transform of this GameObject
   * @type {Transform}
   */
  get transform(): Transform {
    return this;
  }

}