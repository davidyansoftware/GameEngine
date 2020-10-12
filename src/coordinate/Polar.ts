import Coordinate from "./Coordinate";

/**
 * Represent polar coordinates
 * @extends Coordinate
 */
export default class Polar extends Coordinate {
  /**
   *
   * @param {number} magnitude - The magnitude of the Coordinate
   * @param {number} angle - The angle of the Coordinate
   */
  constructor(magnitude: number, angle: number) {
    super();

    this._magnitude = magnitude;
    this._angle = angle;

    this._dirtyCartesian = true;
  }
}