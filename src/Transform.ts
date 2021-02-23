import CircleTransform from "./CircleTransform";
import RectangleTransform from "./RectangleTransform";
import GameObject from "./GameObject";
import Shape from "./Shape";

/**
 * Transform store positional information about GameObjects
 */
export default abstract class Transform {
  shape: Shape;

  private _gameObject: GameObject;
  private _x: number;
  private _y: number;
  private _rotation: number;

  private _absoluteDirty: boolean = false;
  private _absoluteX: number = 0;
  private _absoluteY: number = 0;
  private _absoluteRotation: number = 0;

  /**
   * Create a Transform
   * @param {GameObject} gameObject - The GameObject this Transform is attached to
   * @param {number} x - The x-coordinate
   * @param {number} y - The y-coordinate
   * @param {number} rotation - The rotation in radians
   */
  constructor(gameObject: GameObject, x: number = 0, y: number = 0, rotation: number = 0, shape: Shape) {
    this._gameObject = gameObject;
    this._x = x;
    this._y = y;
    this._rotation = rotation;
    this.shape = shape;

    this._cacheAbsolutePosition();
  }

  abstract isHitting(other: Transform): boolean;
  abstract _isHittingCircle(other: CircleTransform): boolean;
  abstract _isHittingRectangle(other: RectangleTransform): boolean;

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

  /**
   * The x-coordinate of the GameObject
   * @type {number}
   */
  get x(): number {
    return this._x;
  }
  set x(value: number) {
    this._x = value;
    this.markAbsoluteDirty();
  }

  /**
   * The y-coordinate of the GameObject
   * @type {number}
   */
  get y(): number {
    return this._y;
  }
  set y(value: number) {
    this._y = value;
    this.markAbsoluteDirty();
  }

  /**
   * The rotation of the GameObject
   * @type {number}
   */
  get rotation(): number {
    return this._rotation;
  }
  set rotation(value: number) {
    this._rotation = value;
    this.markAbsoluteDirty();
  }

  /**
   * The x-coordinate relative to the root GameObject
   * @type {number}
   */
  get absoluteX(): number {
    if (this._absoluteDirty) {
      this._cacheAbsolutePosition();
    }
    return this._absoluteX;
  }
  set absoluteX(value: number) {
    this._setAbsolutePosition(value, this.absoluteY);
  }

  /**
   * The y-coordinate relative to the root GameObject
   * @type {number}
   */
  get absoluteY(): number {
    if (this._absoluteDirty) {
      this._cacheAbsolutePosition();
    }
    return this._absoluteY;
  }
  set absoluteY(value: number) {
    this._setAbsolutePosition(this.absoluteX, value);
  }

  /**
   * The rotation relative to the root GameObject
   * @type {number}
   */
  get absoluteRotation(): number {
    if (this._absoluteDirty) {
      this._cacheAbsolutePosition();
    }
    return this._absoluteRotation;
  }
  set absoluteRotation(value: number) {
    this._setAbsoluteRotation(value);
  }

  _cacheAbsolutePosition(): void {
    const parentAbsoluteX = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteX
      : 0;
    const parentAbsoluteY = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteY
      : 0;
    const parentAbsoluteRotation = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteRotation
      : 0;

    // angle is negative to negate parent rotation
    const sin = Math.sin(-parentAbsoluteRotation);
    const cos = Math.cos(-parentAbsoluteRotation);

    this._absoluteX = this.x * cos - this.y * sin + parentAbsoluteX;
    this._absoluteY = this.x * sin + this.y * cos + parentAbsoluteY;
    this._absoluteRotation = parentAbsoluteRotation + this._rotation;

    this._absoluteDirty = false;
  }

  _setAbsolutePosition(x: number, y: number): void {
    //TODO simplify this by using a null gameobject/transform object pattern
    const parentAbsoluteX = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteX
      : 0;
    const parentAbsoluteY = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteY
      : 0;
    const parentAbsoluteRotation = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteRotation
      : 0;

    const offsetX = x - parentAbsoluteX;
    const offsetY = y - parentAbsoluteY;
    const sin = Math.sin(parentAbsoluteRotation);
    const cos = Math.cos(parentAbsoluteRotation);

    this.x = offsetX * cos - offsetY * sin;
    this.y = offsetX * sin + offsetY * cos;
  }

  _setAbsoluteRotation(rotation: number): void {
    //TODO simplify this by using a null gameobject/transform object pattern
    const parentAbsoluteRotation = this.gameObject.parent
      ? this.gameObject.parent.transform.absoluteRotation
      : 0;
    this.rotation = rotation - parentAbsoluteRotation;
  }

  private markAbsoluteDirty() {
    this._absoluteDirty = true;
    this.gameObject.gameObjects.forEach((gameObject: GameObject) => {
      gameObject.transform.markAbsoluteDirty();
    });
  }
  
}