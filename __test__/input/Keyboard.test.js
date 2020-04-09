const Keyboard = require("../../src/input/Keyboard");

describe("Keyboard Constructor", () => {
  const KEYBOARD_EVENT_DOWN = "keydown";
  const KEYBOARD_EVENT_UP = "keyup";

  test("Keyboard constructor calls addEventListener", () => {
    jest.spyOn(document, "addEventListener");

    new Keyboard();
    expect(document.addEventListener).toHaveBeenCalled();
    expect(document.addEventListener).toHaveBeenCalledWith(
      KEYBOARD_EVENT_DOWN,
      expect.any(Function)
    );
    expect(document.addEventListener).toHaveBeenCalledWith(
      KEYBOARD_EVENT_UP,
      expect.any(Function)
    );
  });
});

describe("Keyboard", () => {
  const A_KEY = 65;
  const B_KEY = 66;

  let keyboard;

  beforeAll(() => {
    keyboard = new Keyboard();
  });

  test("GetKey different keyCodes returns unique Keys", () => {
    const aKey = keyboard.getKey(A_KEY);
    const bKey = keyboard.getKey(B_KEY);

    expect(aKey).not.toBe(bKey);
  });

  test("GetKey same keyCodes returns same Key", () => {
    const aKey1 = keyboard.getKey(A_KEY);
    const aKey2 = keyboard.getKey(A_KEY);

    expect(aKey1).toBe(aKey2);
  });

  test("Setup key eventListeners", () => {
    const aKey = keyboard.getKey(A_KEY);

    expect(aKey.pressed).toBe(false);

    const keyDownEvent = new KeyboardEvent("keydown", { keyCode: A_KEY });
    document.dispatchEvent(keyDownEvent);

    expect(aKey.pressed).toBe(true);

    const keyUpEvent = new KeyboardEvent("keyup", { keyCode: A_KEY });
    document.dispatchEvent(keyUpEvent);

    expect(aKey.pressed).toBe(false);
  });
});
