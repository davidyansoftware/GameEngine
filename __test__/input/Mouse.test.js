//const Canvas = require("canvas");
import Mouse from "../../src/input/Mouse";
import Camera from "../../src/components/Camera";
import Canvas from "canvas";
import GameObject from "../../src/GameObject";

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
    
    const camera = new GameObject();
    const cameraComponent = new Camera(canvas);
    camera.addComponent(cameraComponent);

    const mouse = new Mouse(cameraComponent);

    const X = 100;
    const Y = 200;
    const mouseEvent = new MouseEvent(MOUSE_EVENT_MOVE, {
      clientX: X,
      clientY: Y
    });

    mouse._onMouseMove(mouseEvent);
    const rect = canvas.getBoundingClientRect();
    expect(mouse.x).toBe(X - Math.round(rect.left - 0.5) - cameraComponent._x);
    expect(mouse.y).toBe(-(Y - Math.round(rect.top - 0.5) - cameraComponent._y));
  });

  test("mouse coordinates are relative to position of camera", () => {
    const canvas = Canvas.createCanvas(100, 100);
    // npm canvas does not impliment getBoundingClientRect()
    canvas.getBoundingClientRect = jest.fn(() => {
      return {
        left: 0,
        top: 0
      };
    });

    const CAMERA_X = 100;
    const CAMERA_Y = 200;

    const camera = new GameObject(CAMERA_X, CAMERA_Y);
    const cameraComponent = new Camera(canvas);
    camera.addComponent(cameraComponent);

    const mouse = new Mouse(cameraComponent);

    const rect = canvas.getBoundingClientRect();
    expect(mouse.x).toBe(CAMERA_X - Math.round(rect.left - 0.5));
    expect(mouse.y).toBe(CAMERA_Y + Math.round(rect.top - 0.5));
  })
});
