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

  test("Mousemove updates Mouse position", () => {
    let mouse = new Mouse();

    const X = 100;
    const Y = 200;
    let mouseEvent = new MouseEvent("mousemove", {
      clientX: X,
      clientY: Y
    });

    mouse._onMouseMove(mouseEvent);
    expect(mouse.x).toBe(X);
    expect(mouse.y).toBe(Y);
  });
});
