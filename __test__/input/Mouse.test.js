const Mouse = require("../../src/input/Mouse");
const Camera = require("../../src/components/Camera");
const Canvas = require("canvas");

describe("Mouse", () => {
  const MOUSE_EVENT_MOVE = "mousemove";
  const MOUSE_EVENT_DOWN = "mousedown";
  const MOUSE_EVENT_UP = "mouseup";

  test("Mouse constructor", () => {
    jest.spyOn(document, "addEventListener");

    new Mouse();
    expect(document.addEventListener).toHaveBeenCalled();
    expect(document.addEventListener).toHaveBeenCalledWith(
      MOUSE_EVENT_MOVE,
      expect.any(Function)
    );
    expect(document.addEventListener).toHaveBeenCalledWith(
      MOUSE_EVENT_DOWN,
      expect.any(Function)
    );
    expect(document.addEventListener).toHaveBeenCalledWith(
      MOUSE_EVENT_UP,
      expect.any(Function)
    );
  });

  test("mousemove updates Mouse position", () => {
    const canvas = Canvas.createCanvas(100, 100);
    // npm canvas does not impliment getBoundingClientRect()
    canvas.getBoundingClientRect = jest.fn(() => {
      return {
        left: 0,
        top: 0
      };
    });
    const camera = new Camera(canvas);
    const mouse = new Mouse(camera);

    const X = 100;
    const Y = 200;
    const mouseEvent = new MouseEvent(MOUSE_EVENT_MOVE, {
      clientX: X,
      clientY: Y
    });

    mouse._onMouseMove(mouseEvent);
    const rect = canvas.getBoundingClientRect();
    expect(mouse.x).toBe(X - Math.round(rect.left - 0.5) - camera._x);
    expect(mouse.y).toBe(-(Y - Math.round(rect.top - 0.5) - camera._y));
  });
});
