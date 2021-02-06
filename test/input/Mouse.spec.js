import * as assert from "assert";
import jsdom from "jsdom";
import Mouse from "../../src/input/Mouse";
import Camera from "../../src/components/Camera";
import Canvas from "canvas";
import GameObject from "../../src/GameObject";

describe("Mouse", () => {
  const MOUSE_MOVE_EVENT = "mousemove";

  it("updates Mouse position when moving", () => {
    const canvas = Canvas.createCanvas(100, 100);
    // npm canvas does not impliment getBoundingClientRect()
    canvas.getBoundingClientRect = () => {
      return {
        left: 0,
        top: 0
      };
    };
    
    const camera = new GameObject();
    const cameraComponent = new Camera(canvas);
    camera.addComponent(cameraComponent);

    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const mouse = new Mouse(window, cameraComponent);

    const X = 100;
    const Y = 200;
    const mouseEvent = new window.MouseEvent(MOUSE_MOVE_EVENT, {
      clientX: X,
      clientY: Y
    });

    mouse._onMouseMove(mouseEvent);
    const rect = canvas.getBoundingClientRect();
    assert.equal(mouse.x, X - Math.round(rect.left - 0.5) - cameraComponent._x);
    assert.equal(mouse.y,-(Y - Math.round(rect.top - 0.5) - cameraComponent._y));
  });

  it("gives coordinates relative to position of camera", () => {
    const canvas = Canvas.createCanvas(100, 100);
    // npm canvas does not impliment getBoundingClientRect()
    canvas.getBoundingClientRect = () => {
      return {
        left: 0,
        top: 0
      };
    };

    const CAMERA_X = 100;
    const CAMERA_Y = 200;

    const camera = new GameObject(CAMERA_X, CAMERA_Y);
    const cameraComponent = new Camera(canvas);
    camera.addComponent(cameraComponent);

    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const mouse = new Mouse(window, cameraComponent);

    const rect = canvas.getBoundingClientRect();
    assert.equal(mouse.x, CAMERA_X - Math.round(rect.left - 0.5));
    assert.equal(mouse.y, CAMERA_Y + Math.round(rect.top - 0.5));
  })
});
