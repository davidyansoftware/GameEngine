const GameObject = require("./GameObject");
const GameLoop = require("./GameLoop");
const Component = require("./Component");

const Camera = require("./components/Camera");
const Text = require("./components/Text");
const Shape = require("./components/Shape");
const Hitbox = require("./components/Hitbox");
const Physics = require("./components/Physics");

const Mouse = require("./input/Mouse");
const Keyboard = require("./input/Keyboard");

const Circle = require("./shapeTypes/Circle");

const Cartesian = require("./coordinate/Cartesian");
const Polar = require("./coordinate/Polar");

const DNA = {
  GameObject: GameObject,
  GameLoop: GameLoop,
  Component: Component,

  Components: {
    Camera: Camera,
    Text: Text,
    Shape: Shape,
    Hitbox: Hitbox,
    Physics: Physics
  },

  Input: {
    Mouse: Mouse
  },

  ShapeTypes: {
    Circle: Circle
  },

  Coordinate: {
    Cartesian: Cartesian,
    Polar: Polar
  },

  get Keyboard() {
    if (!this._keyboard) {
      this._keyboard = new Keyboard();
    }
    return this._keyboard;
  }
};

module.exports = DNA;
