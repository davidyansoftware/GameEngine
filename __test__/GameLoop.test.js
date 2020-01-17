const GameLoop = require("../src/GameLoop");

describe("GameLoop", () => {
  beforeEach(() => {
    jest.spyOn(window, "requestAnimationFrame");
  });

  afterEach(() => {
    window.requestAnimationFrame.mockReset();
  });

  test("GameLoop creates an animation frame", () => {
    const gameLoop = new GameLoop();

    expect(window.requestAnimationFrame).toHaveBeenCalled();
    expect(typeof gameLoop.currAnimationFrame).toBe("number");
  });
});
