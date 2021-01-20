import * as assert from "assert";
import * as sinon from "sinon";
import Canvas from "canvas";
import Text from "../../src/components/Text";

describe("Text logic", () => {
  const TEST = "test";

  let ctx: CanvasRenderingContext2D;
  let text: Text;

  beforeEach(() => {
    const canvas = Canvas.createCanvas(100, 100);
    ctx = canvas.getContext("2d");
    text = new Text(TEST);
  });

  it("will render text", () => {
    const ctxSpy = sinon.spy(ctx, "fillText");

    text.render(ctx);
    assert.ok(ctxSpy.calledOnce);
    assert.ok(ctxSpy.calledWith(TEST, 0, 0));
  });
});
