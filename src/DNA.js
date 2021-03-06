import GameObject from "./GameObject";
import GameLoop from "./GameLoop";
import Component from "./Component";

import EnclosingBoundary from "./components/EnclosingBoundary";
import ExcludingBoundary from "./components/ExcludingBoundary";
import Camera from "./components/Camera";
import Text from "./components/Text";
import Renderer from "./components/Renderer";
import Hitbox from "./components/Hitbox";
import PhysicalBody from "./components/PhysicalBody";
import Physics from "./components/Physics";

import Mouse from "./input/Mouse";
import Keyboard from "./input/Keyboard";

import Circle from "./shapes/Circle";
import Rectangle from "./shapes/Rectangle";

import Cartesian from "./coordinate/Cartesian";
import Polar from "./coordinate/Polar";

export default DNA = {
  GameObject: GameObject,
  GameLoop: GameLoop,
  Component: Component,

  Components: {
    EnclosingBoundary: EnclosingBoundary,
    ExcludingBoundary: ExcludingBoundary,
    Camera: Camera,
    Text: Text,
    Renderer: Renderer,
    Hitbox: Hitbox,
    PhysicalBody: PhysicalBody,
    Physics: Physics
  },

  Input: {
    Keyboard: Keyboard,
    Mouse: Mouse
  },

  Shapes: {
    Circle: Circle,
    Rectangle: Rectangle
  },

  Coordinate: {
    Cartesian: Cartesian,
    Polar: Polar
  }
}