import * as assert from "assert";
import * as testUtils from "../TestUtils";
import Cartesian from "../../src/coordinate/Cartesian";
import Coordinate from "../../src/coordinate/Coordinate";
import Polar from "../../src/coordinate/Polar";

const X = 1;
const Y = 2;
const MAGNITUDE = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
const ANGLE = -Math.atan2(Y, X) + Math.PI / 2;

describe("Cartesian getters", () => {
  let cartesian: Coordinate;

  beforeEach(() => {
    cartesian = new Cartesian(X, Y);
  });

  it("gets x y", () => {
    assert.ok(testUtils.almostEqual(cartesian.x, X));
    assert.ok(testUtils.almostEqual(cartesian.y, Y));
  });

  it("gets magnitude angle", () => {
    assert.ok(testUtils.almostEqual(cartesian.magnitude, MAGNITUDE));
    assert.ok(testUtils.almostEqual(cartesian.angle, ANGLE));
  });
});

describe("Cartesian setters", () => {
  let cartesian: Coordinate;

  beforeEach(() => {
    cartesian = new Cartesian(0, 0);
  });

  it("sets x y", () => {
    cartesian.x = X;
    cartesian.y = Y;

    assert.ok(testUtils.almostEqual(cartesian.magnitude, MAGNITUDE));
    assert.ok(testUtils.almostEqual(cartesian.angle, ANGLE));
  });

  it("sets magnitude angle", () => {
    cartesian.magnitude = MAGNITUDE;
    cartesian.angle = ANGLE;

    assert.ok(testUtils.almostEqual(cartesian.x, X));
    assert.ok(testUtils.almostEqual(cartesian.y, Y));
  });

  it("recalculates when needed", () => {
    cartesian.angle = ANGLE;
    cartesian.magnitude = MAGNITUDE;
    cartesian.x = X;

    assert.ok(testUtils.almostEqual(cartesian.angle, ANGLE));
    assert.ok(testUtils.almostEqual(cartesian.magnitude, MAGNITUDE));
  });
});

describe("Polar getters", () => {
  let polar: Coordinate;

  beforeEach(() => {
    polar = new Polar(MAGNITUDE, ANGLE);
  });

  it("gets magnitude angle", () => {
    const polar = new Polar(MAGNITUDE, ANGLE);

    assert.ok(testUtils.almostEqual(polar.magnitude, MAGNITUDE));
    assert.ok(testUtils.almostEqual(polar.angle, ANGLE));
  });

  it("gets x y", () => {
    assert.ok(testUtils.almostEqual(polar.x, X));
    assert.ok(testUtils.almostEqual(polar.y, Y));
  });
});

describe("Polar setters", () => {
  let polar: Coordinate;

  beforeEach(() => {
    polar = new Polar(0, 0);
  });

  it("sets magnitude angle", () => {
    polar.magnitude = MAGNITUDE;
    polar.angle = ANGLE;

    assert.ok(testUtils.almostEqual(polar.x, X));
    assert.ok(testUtils.almostEqual(polar.y, Y));
  });

  it("sets x y", () => {
    polar.x = X;
    polar.y = Y;

    assert.ok(testUtils.almostEqual(polar.magnitude, MAGNITUDE));
    assert.ok(testUtils.almostEqual(polar.angle, ANGLE));
  });

  it("recalculates when needed", () => {
    polar.x = X;
    polar.y = Y;
    polar.magnitude = MAGNITUDE;

    assert.ok(testUtils.almostEqual(polar.x, X));
    assert.ok(testUtils.almostEqual(polar.y, Y));
  });
});
