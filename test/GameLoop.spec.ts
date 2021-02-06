import * as assert from "assert";
import * as sinon from "sinon";
import GameLoop from "../src/GameLoop";
import GameObject from "../src/GameObject";
require("raf").polyfill();

describe("GameLoop", () => {
  it("creates an animation frame", () => {
    const requestAnimationFrameStub = sinon.stub(global, "requestAnimationFrame");

    const gameObject = new GameObject();
    new GameLoop(gameObject);
    assert.ok(requestAnimationFrameStub.called);
  });

  it("calls update on the gameObject", () => {
    const CURR_TIME = 5;

    const gameObject = new GameObject();
    const gameObjectSpy = sinon.spy(gameObject, "update");

    assert.ok(gameObjectSpy.notCalled);

    const gameLoop = new GameLoop(gameObject);
    gameLoop.gameLoop(CURR_TIME); // called by requestAnimationFrame
    assert.ok(gameObjectSpy.called);
  });

  it("passes elapsedTime to update", () => {
    const START_TIME = 6;
    const FINISH_TIME = 10;
    const DELTA_TIME = FINISH_TIME - START_TIME;

    const gameObject = new GameObject();
    const gameObjectSpy = sinon.spy(gameObject, "update");

    const gameLoop = new GameLoop(gameObject);
    gameLoop.gameLoop(START_TIME);

    gameLoop.gameLoop(FINISH_TIME);

    const deltaTime = DELTA_TIME / 1000;
    assert.ok(gameObjectSpy.lastCall.calledWith(deltaTime));
  });
});
