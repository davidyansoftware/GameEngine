import * as assert from "assert";
import * as sinon from "sinon";
import * as testUtils from "../TestUtils"
import Canvas from "canvas";
import GameObject from "../../src/GameObject";
import Camera from "../../src/components/Camera";

const BACKGROUND_COLOR = "white";
const DELTA_TIME = 5;

function mockHTMLCanvas(width: number, height: number) {
    const canvas = Canvas.createCanvas(width, height);
    return castToHTMLCanvas(canvas);
}

function castToHTMLCanvas(nodeCanvas: Canvas.Canvas) {
  const unknownCanvas = <unknown> nodeCanvas;
  return <HTMLCanvasElement> unknownCanvas;
}

describe("Camera constructor", () => {
  it("will translate context to center", () => {
    const WIDTH = 100;
    const HEIGHT = 200;

    const refNodeCanvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const refCtx = refNodeCanvas.getContext("2d");
    refCtx!.translate(WIDTH / 2, HEIGHT / 2);
    const refMatrix = refCtx!.currentTransform.toString();

    const nodeCanvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const HTMLCanvas = castToHTMLCanvas(nodeCanvas);
    new Camera(HTMLCanvas, new GameObject(), BACKGROUND_COLOR);
    const ctx = nodeCanvas.getContext("2d");
    const matrix = ctx!.currentTransform.toString();

    assert.equal(matrix, refMatrix);
  });
});

describe("Camera", () => {
  const WIDTH = 100;
  const HEIGHT = 200;

  it("will render root object on update", () => {
    const canvas = mockHTMLCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const gameObject = new GameObject();
    const camera = new Camera(canvas, gameObject, BACKGROUND_COLOR);
    gameObject.addComponent(camera);
    const gameObjectSpy = sinon.spy(gameObject, "render");

    gameObject.update(DELTA_TIME);
    assert.ok(gameObjectSpy.calledOnce);
    assert.ok(gameObjectSpy.calledOnceWith(ctx!));
  });

  it("will clear before rendering", () => {
    const canvas = mockHTMLCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");
    const ctxSpy = sinon.spy(ctx!, "clearRect");

    const gameObject = new GameObject();
    const camera = new Camera(canvas, gameObject, BACKGROUND_COLOR);
    gameObject.addComponent(camera);

    camera.update(DELTA_TIME);
    assert.ok(ctxSpy.calledWith(
      -WIDTH / 2,
      -HEIGHT / 2,
      WIDTH,
      HEIGHT
    ));
  });

  it("will offset based on absolute differences", () => {
    const canvas = mockHTMLCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const ROOT_X = 300;
    const ROOT_Y = 400;
    const ROOT_ROTATION = Math.PI / 4;
    const root = new GameObject({x: ROOT_X, y: ROOT_Y, rotation: ROOT_ROTATION});

    const CAMERA_X = 500;
    const CAMERA_Y = 600;
    const CAMERA_ROTATION = Math.PI / 2;
    const gameObject = new GameObject({x: CAMERA_X, y: CAMERA_Y, rotation: CAMERA_ROTATION});
    const camera = new Camera(canvas, root, BACKGROUND_COLOR);
    gameObject.addComponent(camera);

    root.addGameObject(gameObject);

    const translateSpy = sinon.spy(ctx!, "translate");
    const rotateSpy = sinon.spy(ctx!, "rotate");

    camera.update(DELTA_TIME);
    const offsetX = root.transform.position.absoluteX - gameObject.transform.position.absoluteX;
    const offsetY = root.transform.position.absoluteY - gameObject.transform.position.absoluteY;
    const offsetRotation =
      root.transform.position.absoluteRotation - gameObject.transform.position.absoluteRotation;

    assert.ok(translateSpy.calledWith(offsetX, -offsetY));
    testUtils.assertAlmostEqual(rotateSpy.getCall(0).args[0], offsetRotation);
    assert.ok(rotateSpy.calledBefore(translateSpy));
  });

  it("will not transform if it is on the root", () => {
    const canvas = mockHTMLCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const ROOT_X = 300;
    const ROOT_Y = 400;
    const ROOT_ROTATION = Math.PI / 4;
    const root = new GameObject({x: ROOT_X, y: ROOT_Y, rotation: ROOT_ROTATION});

    const camera = new Camera(canvas, root, BACKGROUND_COLOR);
    root.addComponent(camera);

    const ctxTranslateSpy = sinon.spy(ctx!, "translate");
    const ctxRotateSpy = sinon.spy(ctx!, "rotate");
    camera.update(DELTA_TIME);

    //TODO this is not the right way to measure non-transforming
    assert.ok(ctxTranslateSpy.calledWith(0, -0));
    assert.ok(ctxRotateSpy.calledWith(0));
  });

  it("will restore context", () => {
    const nodeCanvas = Canvas.createCanvas(WIDTH, HEIGHT);
    const htmlCanvas = castToHTMLCanvas(nodeCanvas);
    const ctx = nodeCanvas.getContext("2d");

    const ROOT_X = 300;
    const ROOT_Y = 400;
    const ROOT_ROTATION = Math.PI / 4;
    const root = new GameObject({x: ROOT_X, y: ROOT_Y, rotation: ROOT_ROTATION});

    const CAMERA_X = 500;
    const CAMERA_Y = 600;
    const CAMERA_ROTATION = Math.PI / 2;
    const gameObject = new GameObject({x: CAMERA_X, y: CAMERA_Y, rotation: CAMERA_ROTATION});
    const camera = new Camera(htmlCanvas, root, BACKGROUND_COLOR);
    gameObject.addComponent(camera);

    const beforeMatrix = ctx!.currentTransform.toString();

    camera.update(DELTA_TIME);

    const afterMatrix = ctx!.currentTransform.toString();

    assert.equal(afterMatrix, beforeMatrix);
  });
});
