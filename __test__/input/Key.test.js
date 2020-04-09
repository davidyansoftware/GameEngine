const Key = require("../../src/input/Key");
const Keyboard = require("../../src/input/Keyboard");

describe("Key", () => {
  const A_KEY = 65;

  test("Key pressed initialized as false", () => {
    const key = new Key();

    expect(key.pressed).toBe(false);
  });

  test("AddKeyDown callback", () => {
    const keyboard = new Keyboard();
    const aKey = keyboard.getKey(A_KEY);

    const callback = jest.fn();
    aKey.addKeyDown(callback);

    const keyDownEvent = new KeyboardEvent("keydown", { keyCode: A_KEY });
    document.dispatchEvent(keyDownEvent);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("AddKeyUp callback", () => {
    const keyboard = new Keyboard();
    const aKey = keyboard.getKey(A_KEY);

    const callback = jest.fn();
    aKey.addKeyUp(callback);

    const keyUpEvent = new KeyboardEvent("keyup", { keyCode: A_KEY });
    document.dispatchEvent(keyUpEvent);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
