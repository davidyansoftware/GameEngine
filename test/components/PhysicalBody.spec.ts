import * as assert from "assert";
import * as testUtils from "../TestUtils";
import Cartesian from "../../src/coordinate/Cartesian";
import GameObject from "../../src/GameObject";
import PhysicalBody from "../../src/components/PhysicalBody";

const DRAG = 0.5;

const ELAPSED_TIME = 1;

describe("PhysicalBody", () => {
  it("generates PhysicalBody", () => {
    const physicalBody = new PhysicalBody(DRAG);

    assert.equal(physicalBody.drag, DRAG);
  });
});

describe("Velocity", () => {
  // 3/4/5 triangle
  const X_VELOCITY = 3;
  const Y_VELOCITY = 4;

  let physicalBody: PhysicalBody;

  beforeEach(() => {
    const gameObject = new GameObject();
    physicalBody = new PhysicalBody(DRAG);
    gameObject.addComponent(physicalBody);
  });

  it("allows body to move", () => {
    const velocity = new Cartesian(X_VELOCITY, Y_VELOCITY);
    physicalBody.addVelocity(velocity);
    physicalBody.gameObject!.update(ELAPSED_TIME);

    assert.equal(physicalBody.transform!.x, X_VELOCITY * ELAPSED_TIME);
    assert.equal(physicalBody.transform!.y, Y_VELOCITY * ELAPSED_TIME);
  });

  it("is reduced by drag", () => {
    const velocity = new Cartesian(X_VELOCITY, Y_VELOCITY);
    physicalBody.addVelocity(velocity);

    physicalBody.gameObject!.update(ELAPSED_TIME);
    physicalBody.gameObject!.update(ELAPSED_TIME);

    testUtils.assertAlmostEqual(physicalBody.transform!.x, 4.5);
    testUtils.assertAlmostEqual(physicalBody.transform!.y, 6);
  });
});
