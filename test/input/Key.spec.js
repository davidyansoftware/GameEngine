import * as assert from "assert";
import * as sinon from "sinon";
import jsdom from "jsdom";
import Key from "../../src/input/Key";
import Keyboard from "../../src/input/Keyboard";

describe("Key", () => {
  const A_KEY = 65;

  it("initializes pressed as false", () => {
    const key = new Key();

    assert.ok(!key.pressed);
  });

  it("adds AddKeyDown callback", () => {
    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const keyboard = new Keyboard(window);
    const aKey = keyboard.getKey(A_KEY);

    const callback = sinon.fake();
    aKey.addKeyDown(callback);

    const keyDownEvent = new window.KeyboardEvent("keydown", { keyCode: A_KEY });
    window.dispatchEvent(keyDownEvent);

    assert.ok(callback.calledOnce);
  });

  it("adds AddKeyUp callback", () => {
    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const keyboard = new Keyboard(window);
    const aKey = keyboard.getKey(A_KEY);

    const callback = sinon.fake();
    aKey.addKeyUp(callback);

    const keyUpEvent = new window.KeyboardEvent("keyup", { keyCode: A_KEY });
    window.dispatchEvent(keyUpEvent);

    assert.ok(callback.calledOnce);
  });
});
