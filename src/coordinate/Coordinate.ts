function recalculateCartesian(coordinate: Coordinate) {
  coordinate._x = Math.sin(coordinate._angle) * coordinate._magnitude;
  coordinate._y = Math.cos(coordinate._angle) * coordinate._magnitude;
  coordinate._dirtyCartesian = false;
}

//TODO can recalculate angle and magnitude seperately
function recalculatePolar(coordinate: Coordinate) {
  coordinate._magnitude = Math.sqrt(
    Math.pow(coordinate._x, 2) + Math.pow(coordinate._y, 2)
  );
  coordinate._angle = -Math.atan2(coordinate._y, coordinate._x) + Math.PI / 2;
  coordinate._dirtyPolar = false;
}

/**
 * Represent coordinates
 */
export default abstract class Coordinate {
  _x: number = 0;
  _y: number = 0;

  _magnitude: number = 0;
  _angle: number = 0;

  _dirtyCartesian: boolean = false;
  _dirtyPolar: boolean = false;

  constructor() {
  }

  get x(): number {
    if (this._dirtyCartesian) {
      recalculateCartesian(this);
    }

    return this._x;
  }
  set x(x: number) {
    if (this._dirtyCartesian) {
      recalculateCartesian(this);
    }

    this._x = x;
    this._dirtyPolar = true;
  }
  get y(): number {
    if (this._dirtyCartesian) {
      recalculateCartesian(this);
    }

    return this._y;
  }
  set y(y: number) {
    if (this._dirtyCartesian) {
      recalculateCartesian(this);
    }

    this._y = y;
    this._dirtyPolar = true;
  }

  get magnitude(): number {
    if (this._dirtyPolar) {
      recalculatePolar(this);
    }

    return this._magnitude;
  }
  set magnitude(magnitude: number) {
    if (this._dirtyPolar) {
      recalculatePolar(this);
    }

    this._magnitude = magnitude;
    this._dirtyCartesian = true;
  }
  get angle(): number {
    if (this._dirtyPolar) {
      recalculatePolar(this);
    }

    return this._angle;
  }
  set angle(angle: number) {
    if (this._dirtyPolar) {
      recalculatePolar(this);
    }

    this._angle = angle;
    this._dirtyCartesian = true;
  }
}