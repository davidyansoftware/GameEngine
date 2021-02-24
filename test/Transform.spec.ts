import * as assert from "assert";
import GameObject from "../src/GameObject";

describe("Transform constructor", () => {
  it("is tied to its gameObject", () => {
    const gameObject = new GameObject();
    assert.equal(gameObject.transform.gameObject, gameObject);
  });

  it("references itself", () => {
    const gameObject = new GameObject();
    assert.equal(gameObject.transform, gameObject.transform.transform);
  });
});

