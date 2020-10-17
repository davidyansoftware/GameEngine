import Cartesian from "../../src/coordinate/Cartesian";
import GameObject from "../../src/GameObject";
import PhysicalBody from "../../src/components/PhysicalBody";

//const MASS = 100;
const DRAG = .5;

const ELAPSED_TIME = 1;

describe("PhysicalBody", () => {
  test("Constructor generates PhysicalBody", () => {
    const physicalBody = new PhysicalBody(DRAG);

    //expect(physicalBody.mass).toEqual(MASS);
    expect(physicalBody.drag).toEqual(DRAG);
  });
});

describe("Velocity", () => {
  // 3/4/5 triangle
  const X_VELOCITY = 3;
  const Y_VELOCITY = 4;

  let physicalBody;

  beforeEach(() => {
    const gameObject = new GameObject();
    physicalBody = new PhysicalBody(DRAG);
    gameObject.addComponent(physicalBody);
  });

  test("Adding velocity allows body to move", () => {
    const velocity = new Cartesian(X_VELOCITY, Y_VELOCITY);
    physicalBody.addVelocity(velocity);
    physicalBody.gameObject.update(ELAPSED_TIME);

    expect(physicalBody.transform.x).toEqual(X_VELOCITY * ELAPSED_TIME);
    expect(physicalBody.transform.y).toEqual(Y_VELOCITY * ELAPSED_TIME);
  });

  test("Drag reduces velocity", () => {
    const velocity = new Cartesian(X_VELOCITY, Y_VELOCITY);
    physicalBody.addVelocity(velocity);

    physicalBody.gameObject.update(ELAPSED_TIME);
    physicalBody.gameObject.update(ELAPSED_TIME);

    expect(physicalBody.transform.x).toBeCloseTo(4.5);
    expect(physicalBody.transform.y).toBeCloseTo(6);
  });
});