import Circle from "../../src/shapes/Circle";
import Hitbox from "../../src/components/Hitbox";
import GameObject from "../../src/GameObject";

const Y = 0;
const RADIUS = 5;

describe("Non-colliding Hitboxes", () => {
  const NOT_COLLIDING_X_1 = Number.NEGATIVE_INFINITY;
  const NOT_COLLIDING_X_2 = Number.POSITIVE_INFINITY;

  let notColliding1;
  let notColliding2;

  let gameObject1;
  let gameObject2;

  beforeEach(() => {
    const circle = new Circle(RADIUS);

    const hurtboxes = [];
    notColliding1 = new Hitbox(circle, hurtboxes);
    notColliding2 = new Hitbox(circle);
    hurtboxes.push(notColliding2);

    gameObject1 = new GameObject(NOT_COLLIDING_X_1, Y);
    gameObject1.addComponent(notColliding1);
    gameObject2 = new GameObject(NOT_COLLIDING_X_2, Y);
    gameObject2.addComponent(notColliding2);
  });

  test("Non-colliding Hitboxes are not colliding", () => {
    gameObject1.update();

    expect(notColliding1.isHitting(notColliding2)).toBeFalsy();
    expect(notColliding2.isHitting(notColliding1)).toBeFalsy();
  });

  test("Non-colliding Hitboxes dont callback", () => {
    const callback = jest.fn();
    notColliding1.addOnHit(callback);

    gameObject1.update();

    expect(callback).not.toHaveBeenCalled();
  });
});

describe("Colliding Hitboxes", () => {
  const COLLIDING_X = 0;

  const circle = new Circle(RADIUS);

  let colliding1;
  let colliding2;

  let gameObject1;
  let gameObject2;

  beforeEach(() => {
    const hurtboxes = [];
    colliding1 = new Hitbox(circle, hurtboxes);
    colliding2 = new Hitbox(circle);
    hurtboxes.push(colliding2);

    gameObject1 = new GameObject(COLLIDING_X, Y);
    gameObject1.addComponent(colliding1);
    gameObject2 = new GameObject(COLLIDING_X, Y);
    gameObject2.addComponent(colliding2);
  });

  test("Colliding Hitboxes are colliding", () => {
    gameObject1.update();

    expect(colliding1.isHitting(colliding2)).toBe(true);
    expect(colliding2.isHitting(colliding1)).toBe(true);
  });

  test("Colliding Hitboxes callback", () => {
    const callback = jest.fn();
    colliding1.addOnHit(callback);

    gameObject1.update();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
