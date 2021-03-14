import Transform from "./Transform";

/**
 * Positional information about GameObjects
 */
export default class Position {
    private transform: Transform;

    private _x: number;
    private _y: number;
  
    private _absoluteDirty: boolean = false;
    private _absoluteX: number = 0;
    private _absoluteY: number = 0;
  
    /**
     * Create a Position
     * @param {Transform} transform - The GameObject this Transform is attached to
     * @param {number} x - The x-coordinate
     * @param {number} y - The y-coordinate
     */
    constructor(transform: Transform, x: number = 0, y: number = 0) {
      this.transform = transform;

      this._x = x;
      this._y = y;
  
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

    getAbsoluteX(xOffset: number = 0, yOffset: number = 0): number {
      return this.absoluteX + xOffset;
    }

    getAbsoluteY(xOffset: number = 0, yOffset: number = 0): number {
      return this.absoluteY + yOffset;
    }
  
    _cacheAbsolutePosition(): void {
      const parentAbsoluteX = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteX
        : 0;
      const parentAbsoluteY = this.transform.gameObject.parent
        ? this.transform.gameObject.parent.transform.position.absoluteY
        : 0;
  
      this._absoluteX = this.x + parentAbsoluteX;
      this._absoluteY = this.y + parentAbsoluteY;
  
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
  
      this.x = x - parentAbsoluteX;
      this.y = y - parentAbsoluteY;
    }
  
    private markAbsoluteDirty() {
      this._absoluteDirty = true;
      this.transform.gameObject.gameObjects.forEach((gameObject) => {
        gameObject.transform.position.markAbsoluteDirty();
      });
    }
    
  }