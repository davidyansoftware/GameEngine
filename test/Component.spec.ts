import * as assert from "assert";
import GameObject from "../src/GameObject";
import TestComponent from "./TestComponent";

describe("Component", () => {
  it("references the GameObject its attached to", () => {
    const component = new TestComponent();
    assert.equal(component.gameObject, null);

    const gameObject = new GameObject();
    gameObject.addComponent(component);
    assert.equal(component.gameObject, gameObject);
  });

  it("it references the Transform its attached to", () => {
    const component = new TestComponent();
    assert.equal(component.transform, null);

    const gameObject = new GameObject();
    gameObject.addComponent(component);
    assert.equal(component.transform, gameObject.transform);
  });
});
