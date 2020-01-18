const GameObject = require("./GameObject");
const GameLoop = require("./GameLoop");

const Camera = require("./components/Camera");
const Text = require("./components/Text");

const DNA = {
  GameObject: GameObject,
  GameLoop: GameLoop,

  Components: {
    Camera: Camera,
    Text: Text
  }
};

window.DNA = DNA;
