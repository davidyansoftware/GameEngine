import Transform from "./Transform";

/**
 * Positional information about GameObjects
 */
export default class Position {
    private transform: Transform;

    private _x: number;
    private _y: number;
    private _rotation: number;
  
    private _absoluteDirty: boolean = false;
    private _absoluteX: number = 0;
    private _absoluteY: number = 0;
    private _absoluteRotation: number = 0;
  
    /**
     * Create a Position
     * @param {Transform} transform - The GameObject this Transform is attached to
     * @param {number} x - The x-coordinate
     * @param {number} y - The y-coordinate
     * @param {number} rotation - The rotation in radians
     */
    constructor(transform: Transform, x: number = 0, y: number = 0, rotation: number = 0) {
      this.transform = transform;

      this._x = x;
      this._y = y;
      this._rotation = rotation;
  
      this._cacheAbsolutePosition();
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
      this.transform._positionChanged();
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
      this.transform._positionChanged();
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
      this.transform._positionChanged();
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
      this.transform._positionChanged();
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
      this.transform._positionChanged();
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
      this.transform._positionChanged();
    }

    getAbsoluteX(xOffset: number = 0, yOffset: number = 0): number {
        return this.absoluteX + xOffset * Math.cos(this.absoluteRotation) - yOffset * Math.sin(this.absoluteRotation);
    }

    getAbsoluteY(xOffset: number = 0, yOffset: number = 0): number {
        return this.absoluteY + xOffset * Math.sin(this.absoluteRotation) + yOffset * Math.cos(this.absoluteRotation);
    }
  
    _cacheAbsolutePosition(): void {
      const parentAbsoluteX = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteX
        : 0;
      const parentAbsoluteY = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteY
        : 0;
      const parentAbsoluteRotation = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteRotation
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
      const parentAbsoluteX = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteX
        : 0;
      const parentAbsoluteY = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteY
        : 0;
      const parentAbsoluteRotation = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteRotation
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
      const parentAbsoluteRotation = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteRotation
        : 0;
      this.rotation = rotation - parentAbsoluteRotation;
    }
  
    private markAbsoluteDirty() {
      this._absoluteDirty = true;
      this.transform.gameObject.gameObjects.forEach((gameObject) => {
        gameObject.transform.position.markAbsoluteDirty();
      });
    }
    
  }