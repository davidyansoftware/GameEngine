import Cartesian from "../../src/coordinate/Cartesian";
import Polar from "../../src/coordinate/Polar";

const X = 1;
const Y = 2;
const MAGNITUDE = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2));
const ANGLE = -Math.atan2(Y, X) + Math.PI / 2;

describe("Cartesian getters", () => {
  let cartesian;

  beforeEach(() => {
    cartesian = new Cartesian(X, Y);
  });

  test("Cartesian get x y", () => {
    expect(cartesian.x).toBeCloseTo(X);
    expect(cartesian.y).toBeCloseTo(Y);
  });

  test("Cartesian get magnitude angle", () => {
    expect(cartesian.magnitude).toBeCloseTo(MAGNITUDE);
    expect(cartesian.angle).toBeCloseTo(ANGLE);
  });
});

describe("Cartesian setters", () => {
  let cartesian;

  beforeEach(() => {
    cartesian = new Cartesian(0, 0);
  });

  test("Cartesian set x y", () => {
    cartesian.x = X;
    cartesian.y = Y;

    expect(cartesian.magnitude).toBeCloseTo(MAGNITUDE);
    expect(cartesian.angle).toBeCloseTo(ANGLE);
  });

  test("Cartesian set magnitude angle", () => {
    cartesian.magnitude = MAGNITUDE;
    cartesian.angle = ANGLE;

    expect(cartesian.x).toBeCloseTo(X);
    expect(cartesian.y).toBeCloseTo(Y);
  });

  test("Cartesian setter recalculates when needed", () => {
    cartesian.angle = ANGLE;
    cartesian.magnitude = MAGNITUDE;
    cartesian.x = X;

    expect(cartesian.angle).toBeCloseTo(ANGLE);
    expect(cartesian.magnitude).toBeCloseTo(MAGNITUDE);
  });
});

describe("Polar getters", () => {
  let polar;

  beforeEach(() => {
    polar = new Polar(MAGNITUDE, ANGLE);
  });

  test("Polar get magnitude angle", () => {
    const polar = new Polar(MAGNITUDE, ANGLE);

    expect(polar.magnitude).toBeCloseTo(MAGNITUDE);
    expect(polar.angle).toBeCloseTo(ANGLE);
  });

  test("Polar get x y", () => {
    expect(polar.x).toBeCloseTo(X);
    expect(polar.y).toBeCloseTo(Y);
  });

  describe("Polar setters", () => {
    let polar;

    beforeEach(() => {
      polar = new Polar(0, 0);
    });

    test("Polar set magnitude angle", () => {
      polar.magnitude = MAGNITUDE;
      polar.angle = ANGLE;

      expect(polar.x).toBeCloseTo(X);
      expect(polar.y).toBeCloseTo(Y);
    });

    test("Polar set x y", () => {
      polar.x = X;
      polar.y = Y;

      expect(polar.magnitude).toBeCloseTo(MAGNITUDE);
      expect(polar.angle).toBeCloseTo(ANGLE);
    });

    test("Polar setter recalculates when needed", () => {
      polar.x = X;
      polar.y = Y;
      polar.magnitude = MAGNITUDE;

      expect(polar.x).toBeCloseTo(X);
      expect(polar.y).toBeCloseTo(Y);
    });
  });
});
