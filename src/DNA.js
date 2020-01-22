const GameObject = require("./GameObject");
const GameLoop = require("./GameLoop");

const Camera = require("./components/Camera");
const Text = require("./components/Text");
const Shape = require("./components/Shape");
const Hitbox = require("./components/Hitbox");

const Circle = require("./shapeTypes/Circle");

const DNA = {
  GameObject: GameObject,
  GameLoop: GameLoop,

  Components: {
    Camera: Camera,
    Text: Text,
    Shape: Shape,
    Hitbox: Hitbox
  },

  ShapeTypes: {
    Circle: Circle
  }
};

window.DNA = DNA;
