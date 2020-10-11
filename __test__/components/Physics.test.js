import GameObject from "../../src/GameObject";
import Physics from "../../src/components/Physics";

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

    gameObject.update(ELAPSED_TIME);

    expect(gameObject.transform.x).toEqual(X * ELAPSED_TIME);
    expect(gameObject.transform.y).toEqual(Y * ELAPSED_TIME);
  });
});
