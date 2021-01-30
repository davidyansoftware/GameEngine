import * as assert from "assert";
import * as sinon from "sinon";
import jsdom from "jsdom";
import MouseButton from "../../src/input/MouseButton";
import Mouse from "../../src/input/Mouse";

describe("MouseButton", () => {
  const LEFT_CLICK = 0;

  it("initializes pressed as false", () => {
    const mouseButton = new MouseButton();

    assert.ok(!mouseButton.pressed);
  });

  it("adds AddMouseDown callback", () => {
    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const mouse = new Mouse(window);
    const leftMouseButton = mouse.getButton(LEFT_CLICK);

    const callback = sinon.fake();
    leftMouseButton.addMouseDown(callback);

    const mouseDownEvent = new window.MouseEvent("mousedown", {
      button: LEFT_CLICK
    });
    window.dispatchEvent(mouseDownEvent);

    assert.ok(callback.calledOnce);
  });

  it("adds AddMouseUp callback", () => {
    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const mouse = new Mouse(window);
    const leftMouseButton = mouse.getButton(LEFT_CLICK);

    const callback = sinon.fake();
    leftMouseButton.addMouseUp(callback);

    const mouseUpEvent = new window.MouseEvent("mouseup", {
      button: LEFT_CLICK
    });
    window.dispatchEvent(mouseUpEvent);

    assert.ok(callback.calledOnce);
  });
});
