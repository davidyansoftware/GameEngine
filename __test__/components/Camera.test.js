const Canvas = require("canvas");
const GameObject = require("../../src/GameObject");
const Camera = require("../../src/components/Camera");

describe("Camera", () => {
  test("Camera constructor will translate context to center", () => {
    const WIDTH = 100;
    const HEIGHT = 200;
    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);

    new Camera(canvas, null);
    const ctx = canvas.getContext("2d");
    const matrix = ctx.currentTransform;
    expect(matrix.e).toBe(WIDTH / 2);
    expect(matrix.f).toBe(HEIGHT / 2);
  });
});

describe("Camera logic", () => {
  const WIDTH = 100;
  const HEIGHT = 200;

  let ctx;
  let gameObject;
  let camera;

  beforeAll(() => {
    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
    ctx = canvas.getContext("2d");

    gameObject = new GameObject();
    camera = new Camera(canvas, gameObject);
    gameObject.addComponent(camera);
  });

  test("Camera will render root object on update", () => {
    jest.spyOn(gameObject, "render");

    gameObject.update();
    expect(gameObject.render).toHaveBeenCalledTimes(1);
    expect(gameObject.render).toHaveBeenLastCalledWith(ctx);
  });

  test("Camera will clear before rendering", () => {
    jest.spyOn(ctx, "clearRect");

    camera.update(ctx);
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, WIDTH, HEIGHT);
  });
});
