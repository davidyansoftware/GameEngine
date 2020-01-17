const GameLoop = require("../src/GameLoop");

describe("GameLoop", () => {
  test("GameLoop creates an animation frame", () => {
    const gameLoop = new GameLoop();

    expect(gameLoop.currAnimationFrame).toBeDefined();
  });
});
