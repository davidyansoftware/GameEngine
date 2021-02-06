import * as assert from "assert";
import jsdom from "jsdom";
import Keyboard from "../../src/input/Keyboard";

describe("Keyboard", () => {
  const A_KEY = 65;
  const B_KEY = 66;

  it("returns unique keys for different keyCodes", () => {
    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const keyboard = new Keyboard(window);
    const aKey = keyboard.getKey(A_KEY);
    const bKey = keyboard.getKey(B_KEY);

    assert.notEqual(aKey, bKey);
  });

  it("returns same key for same keyCode", () => {
    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const keyboard = new Keyboard(window);
    const aKey1 = keyboard.getKey(A_KEY);
    const aKey2 = keyboard.getKey(A_KEY);

    assert.equal(aKey1, aKey2);
  });

  it("updates current presses status", () => {
    const { window } = new jsdom.JSDOM("<!DOCTYPE html><p>Hello world</p>");
    const keyboard = new Keyboard(window);
    const aKey = keyboard.getKey(A_KEY);

    assert.ok(!aKey.pressed);

    const keyDownEvent = new window.KeyboardEvent("keydown", { keyCode: A_KEY });
    window.dispatchEvent(keyDownEvent);

    assert.ok(aKey.pressed);

    const keyUpEvent = new window.KeyboardEvent("keyup", { keyCode: A_KEY });
    window.dispatchEvent(keyUpEvent);

    assert.ok(!aKey.pressed);
  });
});
