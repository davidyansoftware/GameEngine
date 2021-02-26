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

  protected _dirtyPosition: boolean;

  private _gameObject: GameObject;

  /**
   * Create a Transform
   * @param {GameObject} gameObject - The GameObject this Transform is attached to
   * @param {number} x - The x-coordinate
   * @param {number} y - The y-coordinate
   * @param {number} rotation - The rotation in radians
   */
  constructor(gameObject: GameObject, x: number = 0, y: number = 0, rotation: number = 0, shape: Shape) {
    this._gameObject = gameObject;
    this.position = new Position(this, x, y, rotation);
    this.shape = shape;

    this._dirtyPosition = false;
  }

  abstract isHitting(other: Transform): boolean;
  abstract _isHittingCircle(other: CircleTransform): boolean;
  abstract _isHittingRectangle(other: RectangleTransform): boolean;

  _markDirtyPosition() {
    this._dirtyPosition = true;
    this.gameObject.gameObjects.forEach((gameObject) => {
      gameObject.transform._markDirtyPosition();
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