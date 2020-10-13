/**
 * Represents a type of input
 */
export default class Input {
  constructor(pressDown, pressUp, eventPressable) {
    this._pressables = {};

    document.addEventListener(pressDown, event => {
      const pressableCode = event[eventPressable];
      const pressable = this._pressables[pressableCode];
      if (pressable) {
        pressable._pressed = true;

        for (const callback of pressable._onPressDown) {
          callback(event);
        }
      }
    });

    document.addEventListener(pressUp, event => {
      const pressableCode = event[eventPressable];
      const pressable = this._pressables[pressableCode];
      if (pressable) {
        pressable._pressed = false;

        for (const callback of pressable._onPressUp) {
          callback(event);
        }
      }
    });
  }
}