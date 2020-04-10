const Circle = require("../../src/shapeTypes/Circle");
const Hitbox = require("../../src/components/Hitbox");
const GameObject = require("../../src/GameObject");

describe("Hitbox", () => {
  const COLLIDING_X = 0;

  const NOT_COLLIDING_X_1 = Number.NEGATIVE_INFINITY;
  const NOT_COLLIDING_X_2 = Number.POSITIVE_INFINITY;

  const Y = 0;

  const RADIUS = 5;

  test("Colliding Hitboxes callback", () => {
    const circle = new Circle(RADIUS);

    const hurtboxes = [];
    const colliding1 = new Hitbox(circle, hurtboxes);
    const colliding2 = new Hitbox(circle);
    hurtboxes.push(colliding2);

    const gameObject1 = new GameObject(COLLIDING_X, Y);
    gameObject1.addComponent(colliding1);
    const gameObject2 = new GameObject(COLLIDING_X, Y);
    gameObject2.addComponent(colliding2);

    const callback = jest.fn();

    colliding1.addOnHit(callback);

    gameObject1.update();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("Not colliding Hitboxes dont callback", () => {
    const circle = new Circle(RADIUS);

    const hurtboxes = [];
    const notColliding1 = new Hitbox(circle, hurtboxes);
    const notColliding2 = new Hitbox(circle);
    hurtboxes.push(notColliding2);

    const gameObject1 = new GameObject(NOT_COLLIDING_X_1, Y);
    gameObject1.addComponent(notColliding1);
    const gameObject2 = new GameObject(NOT_COLLIDING_X_2, Y);
    gameObject2.addComponent(notColliding2);

    const callback = jest.fn();

    gameObject1.update();

    expect(callback).not.toHaveBeenCalled();
  });
});
