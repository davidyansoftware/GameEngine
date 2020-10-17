import Canvas from "canvas";
import Text from "../../src/components/Text";

describe("Text logic", () => {
  const TEST = "test";

  let ctx;
  let text;

  beforeAll(() => {
    const canvas = Canvas.createCanvas(100, 100);
    ctx = canvas.getContext("2d");
    text = new Text(TEST);
  });

  test("Text will render text", () => {
    jest.spyOn(ctx, "fillText");

    text.render(ctx);
    expect(ctx.fillText).toHaveBeenCalledTimes(1);
    expect(ctx.fillText).toHaveBeenLastCalledWith(TEST, 0, 0);
  });
});
