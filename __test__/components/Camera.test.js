import Canvas from "canvas";
import GameObject from "../../src/GameObject";
import Camera from "../../src/components/Camera";

describe("Camera", () => {
  test("Camera constructor will translate context to center", () => {
    const WIDTH = 100;
    const HEIGHT = 200;

    const refCanvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const refCtx = refCanvas.getContext("2d");
    refCtx.translate(WIDTH / 2, HEIGHT / 2);
    const refMatrix = refCtx.currentTransform;

    const canvas = Canvas.createCanvas(WIDTH, HEIGHT);
    new Camera(canvas, null);
    const ctx = canvas.getContext("2d");
    const matrix = ctx.currentTransform;

    expect(matrix).toEqual(refMatrix);
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

    const translateSpy = jest.spyOn(ctx, "translate");
    const rotateSpy = jest.spyOn(ctx, "rotate");

    camera.update();
    const offsetX = root.transform.absoluteX - gameObject.transform.absoluteX;
    const offsetY = root.transform.absoluteY - gameObject.transform.absoluteY;
    const offsetRotation =
      root.transform.absoluteRotation - gameObject.transform.absoluteRotation;
    expect(ctx.translate).toHaveBeenCalledWith(offsetX, -offsetY);
    expect(ctx.rotate).toHaveBeenCalledWith(offsetRotation);
    expect(isFirstCalledBefore(rotateSpy, translateSpy)).toBe(true);
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
    expect(ctx.translate).toHaveBeenCalledWith(0, -0);
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

function isFirstCalledBefore(spy1, spy2) {
  const spy1Order = spy1.mock.invocationCallOrder[0];
  const spy2Order = spy2.mock.invocationCallOrder[0];
  return spy1Order < spy2Order;
}
