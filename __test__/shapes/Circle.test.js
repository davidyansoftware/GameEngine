//const Canvas = require("canvas");
import Circle from "../../src/shapes/Circle";
import Hitbox from "../../src/components/Hitbox";
import GameObject from "../../src/GameObject";
import Canvas from "canvas";

describe("Circle render", () => {
  test("render renders a circle", () => {
    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    jest.spyOn(ctx, "arc");
    jest.spyOn(ctx, "stroke");

    const RADIUS = 5;
    const circle = new Circle(RADIUS);
    circle.render(ctx);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(ctx.arc).toHaveBeenLastCalledWith(0, 0, RADIUS, 0, Math.PI * 2);
    expect(ctx.stroke).toHaveBeenCalledTimes(1);
  });
});

describe("Circle hit detection", () => {
  test("Circles overlapping", () => {
    const X = 0;
    const Y = 0;
    const RADIUS = 5;
    const hitboxCircle = new Circle(RADIUS);
    const hitboxGameObject = new GameObject(X, Y, 0, hitboxCircle);
    const hitbox = new Hitbox();
    hitboxGameObject.addComponent(hitbox);

    const hurtboxCircle = new Circle(RADIUS);
    const hurtboxGameObject = new GameObject(X, Y, 0, hurtboxCircle);
    const hurtbox = new Hitbox();
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxCircle.isHitting(hitbox, hurtbox)).toBe(true);
  });

  test("Circles touching", () => {
    const X = 0;
    const Y = 0;
    const RADIUS = 5;
    const X_OFFSET = RADIUS * 2;

    const hitboxCircle = new Circle(RADIUS);
    const hitboxGameObject = new GameObject(X, Y, 0, hitboxCircle);
    const hitbox = new Hitbox();
    hitboxGameObject.addComponent(hitbox);

    const hurtboxCircle = new Circle(RADIUS);
    const hurtboxGameObject = new GameObject(X + X_OFFSET, Y, 0, hurtboxCircle);
    const hurtbox = new Hitbox();
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxCircle.isHitting(hitbox, hurtbox)).toBe(true);
  });

  test("Circles off-by-one", () => {
    const X = 0;
    const Y = 0;
    const RADIUS = 5;
    const X_OFFSET = RADIUS * 2 + 1;

    const hitboxCircle = new Circle(RADIUS);
    const hitboxGameObject = new GameObject(X, Y, 0, hitboxCircle);
    const hitbox = new Hitbox();
    hitboxGameObject.addComponent(hitbox);

    const hurtboxCircle = new Circle(RADIUS);
    const hurtboxGameObject = new GameObject(X + X_OFFSET, Y, 0, hurtboxCircle);
    const hurtbox = new Hitbox();
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxCircle.isHitting(hitbox, hurtbox)).toBe(false);
  });
});
