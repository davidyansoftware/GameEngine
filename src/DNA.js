const GameObject = require("./GameObject");
const GameLoop = require("./GameLoop");
const Component = require("./Component");

const Camera = require("./components/Camera");
const Text = require("./components/Text");
const Renderer = require("./components/Renderer");
const Hitbox = require("./components/Hitbox");
const Physics = require("./components/Physics");

const Mouse = require("./input/Mouse");
const Keyboard = require("./input/Keyboard");

const Circle = require("./shapes/Circle");

const Cartesian = require("./coordinate/Cartesian");
const Polar = require("./coordinate/Polar");

const DNA = {
  GameObject: GameObject,
  GameLoop: GameLoop,
  Component: Component,

  Components: {
    Camera: Camera,
    Text: Text,
    Renderer: Renderer,
    Hitbox: Hitbox,
    Physics: Physics
  },

  Input: {
    Mouse: Mouse
  },

  Shapes: {
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
