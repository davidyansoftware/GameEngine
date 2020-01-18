const Canvas = require("canvas");
const GameObject = require("../../src/GameObject");
const Camera = require("../../src/Components/Camera");

describe("Camera constructor", () => {
  test("Camera constructor creates a Camera", () => {
    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");

    const gameObject = new GameObject();
    const camera = new Camera(ctx, gameObject);
    gameObject.addComponent(camera);
  });
});

describe("Camera logic", () => {
  let ctx;
  let gameObject;
  let camera;

  beforeAll(() => {
    const canvas = Canvas.createCanvas(100, 100);
    ctx = canvas.getContext("2d");

    gameObject = new GameObject();
    camera = new Camera(ctx, gameObject);
    gameObject.addComponent(camera);
  });

  test("Camera will render root object on update", () => {
    jest.spyOn(gameObject, "render");

    gameObject.update();
    expect(gameObject.render).toHaveBeenCalledTimes(1);
    expect(gameObject.render).toHaveBeenLastCalledWith(ctx);
  });
});
