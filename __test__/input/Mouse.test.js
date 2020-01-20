const Mouse = require("../../src/input/Mouse");

describe("Mouse", () => {
  test("Mouse constructor", () => {
    jest.spyOn(document, "addEventListener");

    let mouse = new Mouse();
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
    expect(document.addEventListener).toHaveBeenCalledWith(
      "mousemove",
      mouse._onMouseMove
    );
  });
});
