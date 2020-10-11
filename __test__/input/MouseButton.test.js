import MouseButton from "../../src/input/MouseButton";
import Mouse from "../../src/input/Mouse";

describe("MouseButton", () => {
  const LEFT_CLICK = 0;

  test("MouseButton pressed initialized as false", () => {
    const mouseButton = new MouseButton();

    expect(mouseButton.pressed).toBe(false);
  });

  test("AddMouseDown callback", () => {
    const mouse = new Mouse();
    const leftMouseButton = mouse.getButton(LEFT_CLICK);

    const callback = jest.fn();
    leftMouseButton.addMouseDown(callback);

    const mouseDownEvent = new MouseEvent("mousedown", {
      button: LEFT_CLICK
    });
    document.dispatchEvent(mouseDownEvent);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("AddMouseUp callback", () => {
    const mouse = new Mouse();
    const leftMouseButton = mouse.getButton(LEFT_CLICK);

    const callback = jest.fn();
    leftMouseButton.addMouseUp(callback);

    const mouseUpEvent = new MouseEvent("mouseup", {
      button: LEFT_CLICK
    });
    document.dispatchEvent(mouseUpEvent);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
