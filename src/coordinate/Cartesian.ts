import Coordinate from "./Coordinate";

/**
 * Represent cartesian coordinates
 * @extends Coordinate
 */
export default class Cartesian extends Coordinate {
  /**
   *
   * @param {number} x - The x value of the Coordinate
   * @param {number} y - The y value of the Coordinate
   */
  constructor(x: number, y: number) {
    super();

    this._x = x;
    this._y = y;

    this._dirtyPolar = true;
  }
}