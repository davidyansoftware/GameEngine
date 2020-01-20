const GameLoop = require("../src/GameLoop");
const GameObject = require("../src/GameObject");

describe("GameLoop", () => {
  test("GameLoop creates an animation frame", () => {
    jest.spyOn(window, "requestAnimationFrame");

    const gameObject = new GameObject();
    const gameLoop = new GameLoop(gameObject);

    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  test("GameLoop calls update on the gameObject", () => {
    const gameObject = new GameObject();
    jest.spyOn(gameObject, "update");

    expect(gameObject.update).not.toHaveBeenCalled();

    const gameLoop = new GameLoop(gameObject);
    gameLoop.gameLoop(); // called by requestAnimationFrame
    expect(gameObject.update).toHaveBeenCalled();
  });

  test("GameLoop passes elapsedTime to update", () => {
    const gameObject = new GameObject();
    jest.spyOn(gameObject, "update");

    const gameLoop = new GameLoop(gameObject);
    const currTimeStart = performance.now();
    gameLoop.gameLoop(currTimeStart);

    const currTimeFinish = performance.now();
    gameLoop.gameLoop(currTimeFinish);

    const deltaTime = (currTimeFinish - currTimeStart) / 1000;
    expect(gameObject.update).toHaveBeenLastCalledWith(deltaTime);
  });
});
