const Transform = require("../src/Transform");

describe("Transform", () => {
  test("Transform defaults to (0,0)", () => {
    const defaultTransform = new Transform();
    expect(defaultTransform.x).toBe(0);
    expect(defaultTransform.y).toBe(0);

    const X_VALUE = 1;
    const Y_VALUE = 2;
    const transform = new Transform(X_VALUE, Y_VALUE);
    expect(transform.x).toBe(X_VALUE);
    expect(transform.y).toBe(Y_VALUE);
  });
});
