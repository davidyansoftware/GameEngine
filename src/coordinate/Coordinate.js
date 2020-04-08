function recalculateCartesian(coordinate) {
  coordinate._x = Math.sin(coordinate._angle) * coordinate._magnitude;
  coordinate._y = -Math.cos(coordinate._angle) * coordinate._magnitude;
  coordinate._dirtyCartesian = false;
}

//TODO can recalculate angle and magnitude seperately
function recalculatePolar(coordinate) {
  coordinate._magnitude = Math.sqrt(
    Math.pow(coordinate._x, 2) + Math.pow(coordinate._y, 2)
  );
  coordinate._angle = Math.atan2(coordinate._y, coordinate._x);
  coordinate._dirtyPolar = false;
}

/**
 * Represent coordinates
 */
class Coordinate {
  constructor() {
    this._x;
    this._y;

    this._magnitude;
    this._angle;

    this._dirtyCartesian;
    this._dirtyPolar;
  }

  get x() {
    if (this._dirtyCartesian) {
      recalculateCartesian(this);
    }

    return this._x;
  }
  get y() {
    if (this._dirtyCartesian) {
      recalculateCartesian(this);
    }

    return this._x;
  }

  get magnitude() {
    if (this._dirtyPolar) {
      recalculatePolar(this);
    }

    return this._magnitude;
  }
  get angle() {
    if (this._dirtyPolar) {
      recalculatePolar(this);
    }

    return this._angle;
  }
}

module.exports = Coordinate;
