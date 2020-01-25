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

  test("Camera will render root object on update", () => {
    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const gameObject = new GameObject();
    const camera = new Camera(canvas, gameObject);
    gameObject.addComponent(camera);
    jest.spyOn(gameObject, "render");

    gameObject.update();
    expect(gameObject.render).toHaveBeenCalledTimes(1);
    expect(gameObject.render).toHaveBeenLastCalledWith(ctx);
  });

  test("Camera will clear before rendering", () => {
    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    jest.spyOn(ctx, "clearRect");

    const gameObject = new GameObject();
    const camera = new Camera(canvas, gameObject);
    gameObject.addComponent(camera);

    camera.update(ctx);
    expect(ctx.clearRect).toHaveBeenCalledWith(
      -WIDTH / 2,
      -HEIGHT / 2,
      WIDTH,
      HEIGHT
    );
  });

  test("Camera will offset based on absolute differences", () => {
    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    jest.spyOn(ctx, "translate");
    jest.spyOn(ctx, "rotate");

    const ROOT_X = 300;
    const ROOT_Y = 400;
    const ROOT_ROTATION = Math.PI / 4;
    const root = new GameObject(ROOT_X, ROOT_Y, ROOT_ROTATION);

    const CAMERA_X = 500;
    const CAMERA_Y = 600;
    const CAMERA_ROTATION = Math.PI / 2;
    const gameObject = new GameObject(CAMERA_X, CAMERA_Y, CAMERA_ROTATION);
    const camera = new Camera(canvas, root);
    gameObject.addComponent(camera);

    root.addGameObject(gameObject);

    camera.update();
    const offsetX = root.transform.absoluteX - gameObject.transform.absoluteX;
    const offsetY = root.transform.absoluteY - gameObject.transform.absoluteY;
    const offsetRotation =
      root.transform.absoluteRotation - gameObject.transform.absoluteRotation;
    expect(ctx.translate).toHaveBeenCalledWith(offsetX, offsetY);
    expect(ctx.rotate).toHaveBeenCalledWith(offsetRotation);
  });

  test("Camera will not transform if it is on the root", () => {
    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const ROOT_X = 300;
    const ROOT_Y = 400;
    const ROOT_ROTATION = Math.PI / 4;
    const root = new GameObject(ROOT_X, ROOT_Y, ROOT_ROTATION);

    const camera = new Camera(canvas, root);
    root.addComponent(camera);

    jest.spyOn(ctx, "translate");
    jest.spyOn(ctx, "rotate");
    camera.update();
    expect(ctx.translate).toHaveBeenCalledWith(0, 0);
    expect(ctx.rotate).toHaveBeenCalledWith(0);
  });

  test("Camera will restore context", () => {
    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const ROOT_X = 300;
    const ROOT_Y = 400;
    const ROOT_ROTATION = Math.PI / 4;
    const root = new GameObject(ROOT_X, ROOT_Y, ROOT_ROTATION);

    const CAMERA_X = 500;
    const CAMERA_Y = 600;
    const CAMERA_ROTATION = Math.PI / 2;
    const gameObject = new GameObject(CAMERA_X, CAMERA_Y, CAMERA_ROTATION);
    const camera = new Camera(canvas, root);
    gameObject.addComponent(camera);

    const beforeMatrix = ctx.currentTransform;

    camera.update();

    const afterMatrix = ctx.currentTransform;
    expect(afterMatrix).toEqual(beforeMatrix);
  });
});
