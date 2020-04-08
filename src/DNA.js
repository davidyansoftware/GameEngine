const GameObject = require("./GameObject");
const GameLoop = require("./GameLoop");
const Component = require("./Component");

const Camera = require("./components/Camera");
const Text = require("./components/Text");
const Shape = require("./components/Shape");
const Hitbox = require("./components/Hitbox");

const Mouse = require("./input/Mouse");

const Circle = require("./shapeTypes/Circle");

const DNA = {
  GameObject: GameObject,
  GameLoop: GameLoop,
  Component: Component,

  Components: {
    Camera: Camera,
    Text: Text,
    Shape: Shape,
    Hitbox: Hitbox
  },

  Input: {
    Mouse: Mouse
  },

  ShapeTypes: {
    Circle: Circle
  },

  get Keyboard() {
    if (!this._keyboard) {
      this._keyboard = new Keyboard();
    }
    return this._keyboard;
  }
};

window.DNA = DNA;
