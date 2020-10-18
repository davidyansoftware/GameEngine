/**
 * Represent coordinates
 */
export default abstract class Coordinate {
  protected _x: number = 0;
  protected _y: number = 0;

  protected _magnitude: number = 0;
  protected _angle: number = 0;

  protected _dirtyCartesian: boolean = false;
  protected _dirtyPolar: boolean = false;

  constructor() {
  }

  get x(): number {
    if (this._dirtyCartesian) {
      this.recalculateCartesian();
    }

    return this._x;
  }
  set x(x: number) {
    if (this._dirtyCartesian) {
      this.recalculateCartesian();
    }

    this._x = x;
    this._dirtyPolar = true;
  }
  get y(): number {
    if (this._dirtyCartesian) {
      this.recalculateCartesian();
    }

    return this._y;
  }
  set y(y: number) {
    if (this._dirtyCartesian) {
      this.recalculateCartesian();
    }

    this._y = y;
    this._dirtyPolar = true;
  }

  get magnitude(): number {
    if (this._dirtyPolar) {
      this.recalculatePolar();
    }

    return this._magnitude;
  }
  set magnitude(magnitude: number) {
    if (this._dirtyPolar) {
      this.recalculatePolar();
    }

    this._magnitude = magnitude;
    this._dirtyCartesian = true;
  }
  get angle(): number {
    if (this._dirtyPolar) {
      this.recalculatePolar();
    }

    return this._angle;
  }
  set angle(angle: number) {
    if (this._dirtyPolar) {
      this.recalculatePolar();
    }

    this._angle = angle;
    this._dirtyCartesian = true;
  }

  private recalculateCartesian() {
    this._x = Math.sin(this._angle) * this._magnitude;
    this._y = Math.cos(this._angle) * this._magnitude;
    this._dirtyCartesian = false;
  }
  
  //TODO can recalculate angle and magnitude seperately
  private recalculatePolar() {
    this._magnitude = Math.sqrt(
      Math.pow(this._x, 2) + Math.pow(this._y, 2)
    );
    this._angle = -Math.atan2(this._y, this._x) + Math.PI / 2;
    this._dirtyPolar = false;
  }
}