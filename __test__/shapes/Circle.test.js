const Circle = require("../../src/shapes/Circle");
const Hitbox = require("../../src/components/Hitbox");
const GameObject = require("../../src/GameObject");
const Canvas = require("canvas");

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
    expect(ctx.arc).toHaveBeenLastCalledWith(0, 0, RADIUS, Math.PI * 2);
    expect(ctx.stroke).toHaveBeenCalledTimes(1);
  });
});

describe("Circle hit detection", () => {
  test("Circles overlapping", () => {
    const X = 0;
    const Y = 0;
    const RADIUS = 5;
    const hitboxCircle = new Circle(RADIUS);
    const hitbox = new Hitbox(hitboxCircle);
    const hitboxGameObject = new GameObject(X, Y);
    hitboxGameObject.addComponent(hitbox);

    const hurtboxCircle = new Circle(RADIUS);
    const hurtbox = new Hitbox(hurtboxCircle);
    const hurtboxGameObject = new GameObject(X, Y);
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxCircle.isCollidingWith(hitbox, hurtbox)).toBe(true);
  });

  test("Circles touching", () => {
    const X = 0;
    const Y = 0;
    const RADIUS = 5;
    const X_OFFSET = RADIUS * 2;

    const hitboxCircle = new Circle(RADIUS);
    const hitbox = new Hitbox(hitboxCircle);
    const hitboxGameObject = new GameObject(X, Y);
    hitboxGameObject.addComponent(hitbox);

    const hurtboxCircle = new Circle(RADIUS);
    const hurtbox = new Hitbox(hurtboxCircle);
    const hurtboxGameObject = new GameObject(X + X_OFFSET, Y);
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxCircle.isCollidingWith(hitbox, hurtbox)).toBe(true);
  });

  test("Circles off-by-one", () => {
    const X = 0;
    const Y = 0;
    const RADIUS = 5;
    const X_OFFSET = RADIUS * 2 + 1;

    const hitboxCircle = new Circle(RADIUS);
    const hitbox = new Hitbox(hitboxCircle);
    const hitboxGameObject = new GameObject(X, Y);
    hitboxGameObject.addComponent(hitbox);

    const hurtboxCircle = new Circle(RADIUS);
    const hurtbox = new Hitbox(hurtboxCircle);
    const hurtboxGameObject = new GameObject(X + X_OFFSET, Y);
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxCircle.isCollidingWith(hitbox, hurtbox)).toBe(false);
  });
});
