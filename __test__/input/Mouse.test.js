const Mouse = require("../../src/input/Mouse");

const MOUSE_EVENT_MOVE = "mousemove";

describe("Mouse", () => {
  test("Mouse constructor", () => {
    jest.spyOn(document, "addEventListener");

    let mouse = new Mouse();
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
    expect(document.addEventListener).toHaveBeenCalledWith(
      MOUSE_EVENT_MOVE,
      expect.any(Function)
    );
  });

  test("mousemove updates Mouse position", () => {
    let mouse = new Mouse();

    const X = 100;
    const Y = 200;
    let mouseEvent = new MouseEvent(MOUSE_EVENT_MOVE, {
      clientX: X,
      clientY: Y
    });

    mouse._onMouseMove(mouseEvent);
    expect(mouse.x).toBe(X);
    expect(mouse.y).toBe(Y);
  });
});
