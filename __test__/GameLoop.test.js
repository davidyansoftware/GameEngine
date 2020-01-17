const GameLoop = require("../src/GameLoop");
const GameObject = require("../src/GameObject");

describe("GameLoop", () => {
  test("GameLoop creates an animation frame", () => {
    jest.spyOn(window, "requestAnimationFrame");

    const gameObject = new GameObject();
    const gameLoop = new GameLoop(gameObject);

    expect(window.requestAnimationFrame).toHaveBeenCalled();
    expect(typeof gameLoop.currAnimationFrame).toBe("number");
  });

  test("GameLoop calls update on the gameObject", () => {
    const gameObject = new GameObject();
    jest.spyOn(gameObject, "update");

    expect(gameObject.update).not.toHaveBeenCalled();

    const gameLoop = new GameLoop(gameObject);
    expect(gameObject.update).toHaveBeenCalled();
  });
});
