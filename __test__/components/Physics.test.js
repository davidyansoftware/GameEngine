const GameObject = require("../../src/GameObject");
const Physics = require("../../src/components/Physics");

const X = 100;
const Y = 200;

const ELAPSED_TIME = 1;

describe("Physics", () => {
  test("Constructor generates Physics", () => {
    const physics = new Physics(X, Y);

    expect(physics.x).toEqual(X);
    expect(physics.y).toEqual(Y);
  });

  test("Physics updates position on update", () => {
    const gameObject = new GameObject();
    const physics = new Physics(X, Y);
    gameObject.addComponent(physics);

    gameObject.update();

    expect(gameObject.transform.x).toEqual(X);
    expect(gameObject.transform.y).toEqual(Y);
  });
});
