import Circle from "../../src/shapes/Circle";
import Hitbox from "../../src/components/Hitbox";
import GameObject from "../../src/GameObject";
import Rectangle from "../../src/shapes/Rectangle";
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

describe("Circle on circle hit detection", () => {
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

describe("Circle on rectangle hit detection", () => {
  test("Circle overlapping rectangle", () => {
    const X = 0;
    const Y = 0;
    const WIDTH = 5;
    const HEIGHT = 5;
    const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
    const hitboxGameObject = new GameObject(X, Y, 0, hitboxRectangle);
    const hitbox = new Hitbox();
    hitboxGameObject.addComponent(hitbox);

    const RADIUS = 5;
    const hurtboxCircle = new Circle(RADIUS);
    const hurtboxGameObject = new GameObject(X, Y, 0, hurtboxCircle);
    const hurtbox = new Hitbox();
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxRectangle.isHitting(hitbox, hurtbox)).toBe(true);
  });

  test("Circle touching rectangle", () => {
    const X = 0;
    const Y = 0;
    const WIDTH = 5;
    const HEIGHT = 5;

    const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
    const hitboxGameObject = new GameObject(X, Y, 0, hitboxRectangle);
    const hitbox = new Hitbox();
    hitboxGameObject.addComponent(hitbox);

    const RADIUS = 5;
    const X_OFFSET = RADIUS + WIDTH / 2;

    const hurtboxCircle = new Circle(RADIUS);
    const hurtboxGameObject = new GameObject(X + X_OFFSET, Y, 0, hurtboxCircle);
    const hurtbox = new Hitbox();
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxRectangle.isHitting(hitbox, hurtbox)).toBe(true);
  });

  test("Circle off-by-one rectangle", () => {
    const X = 0;
    const Y = 0;
    const WIDTH = 5;
    const HEIGHT = 5;

    const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
    const hitboxGameObject = new GameObject(X, Y, 0, hitboxRectangle);
    const hitbox = new Hitbox();
    hitboxGameObject.addComponent(hitbox);

    const RADIUS = 5;
    const X_OFFSET = RADIUS + WIDTH / 2 + 1;

    const hurtboxCircle = new Circle(RADIUS);
    const hurtboxGameObject = new GameObject(X + X_OFFSET, Y, 0, hurtboxCircle);
    const hurtbox = new Hitbox();
    hurtboxGameObject.addComponent(hurtbox);

    expect(hitboxRectangle.isHitting(hitbox, hurtbox)).toBe(false);
  });
});

describe("Circle is enclosing", () => {
  test("Circle is enclosed", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X, Y, 0, innerCircle);

    expect(outerCircle.isEnclosing(outerCircleGameObject, innerCircleGameObject)).toBe(true);
  });
  
  test("Circles off-by-one", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = INNER_RADIUS;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET - 1, Y, 0, innerCircle);

    expect(outerCircle.isEnclosing(outerCircleGameObject, innerCircleGameObject)).toBe(true);
  });

  test("Circle touching enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = INNER_RADIUS;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    expect(outerCircle.isEnclosing(outerCircleGameObject, innerCircleGameObject)).toBe(false);
  });

  test("Circle outside enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = 20;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    expect(outerCircle.isEnclosing(outerCircleGameObject, innerCircleGameObject)).toBe(false);
  });

  describe("Circle is excluding", () => {
    test("Circle is enclosed", () => {
      const X = 0;
      const Y = 0;
      const OUTER_RADIUS = 10;
      const INNER_RADIUS = 5;
  
      const outerCircle = new Circle(OUTER_RADIUS);
      const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);
  
      const innerCircle = new Circle(INNER_RADIUS);
      const innerCircleGameObject = new GameObject(X, Y, 0, innerCircle);
  
      expect(outerCircle.isExcluding(outerCircleGameObject, innerCircleGameObject)).toBe(false);
    });
  
    test("Circle touching enclosure", () => {
      const X = 0;
      const Y = 0;
      const OUTER_RADIUS = 10;
      const INNER_RADIUS = 5;
      const X_OFFSET = OUTER_RADIUS + INNER_RADIUS;
  
      const outerCircle = new Circle(OUTER_RADIUS);
      const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);
  
      const innerCircle = new Circle(INNER_RADIUS);
      const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);
  
      expect(outerCircle.isExcluding(outerCircleGameObject, innerCircleGameObject)).toBe(false);
    });

    test("Circles off-by-one", () => {
      const X = 0;
      const Y = 0;
      const OUTER_RADIUS = 10;
      const INNER_RADIUS = 5;
      const X_OFFSET = OUTER_RADIUS + INNER_RADIUS;
  
      const outerCircle = new Circle(OUTER_RADIUS);
      const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);
  
      const innerCircle = new Circle(INNER_RADIUS);
      const innerCircleGameObject = new GameObject(X + X_OFFSET + 1, Y, 0, innerCircle);
  
      expect(outerCircle.isExcluding(outerCircleGameObject, innerCircleGameObject)).toBe(true);
    });
  
    test("Circle outside enclosure", () => {
      const X = 0;
      const Y = 0;
      const OUTER_RADIUS = 10;
      const INNER_RADIUS = 5;
      const X_OFFSET = 20;
  
      const outerCircle = new Circle(OUTER_RADIUS);
      const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);
  
      const innerCircle = new Circle(INNER_RADIUS);
      const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);
  
      expect(outerCircle.isExcluding(outerCircleGameObject, innerCircleGameObject)).toBe(true);
    });
  });
});