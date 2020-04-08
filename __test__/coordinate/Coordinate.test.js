const Coordinate = require("../../src/coordinate/Coordinate");
const Cartesian = require("../../src/coordinate/Cartesian");
const Polar = require("../../src/coordinate/Polar");

const X = 1;
const Y = 1;
const MAGNITUDE = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
const ANGLE = Math.atan2(X, Y);

describe("Cartesian", () => {
  let cartesian;

  beforeEach(() => {
    cartesian = new Cartesian(X, Y);
  });

  test("Cartesian constructs a Coordinate", () => {
    expect(cartesian.x).toBe(X);
    expect(cartesian.y).toBe(Y);
  });

  test("Cartesian get magnitude angle", () => {
    expect(cartesian.magnitude).toBe(MAGNITUDE);
    expect(cartesian.angle).toBe(ANGLE);
  });
});

describe("Polar", () => {
  let polar;

  beforeEach(() => {
    polar = new Polar(MAGNITUDE, ANGLE);
  });

  test("Polar constructs a Coordinate", () => {
    const polar = new Polar(MAGNITUDE, ANGLE);

    expect(polar.magnitude).toBe(MAGNITUDE);
    expect(polar.angle).toBe(ANGLE);
  });

  test("Polar get x y", () => {
    expect(polar.x).toBe(X);
    expect(polar.y).toBe(Y);
  });
});
