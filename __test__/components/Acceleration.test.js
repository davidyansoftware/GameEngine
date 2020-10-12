import { maxHeaderSize } from "http";
import Acceleration from "../../src/components/Acceleration";
import Cartesian from "../../src/coordinate/Cartesian";
import GameObject from "../../src/GameObject";

const X_ACCEL = 100;
const Y_ACCEL = 200;

const MAX_SPEED = 1;
const DRAG = .5;

const ELAPSED_TIME = 1;
const ITERATIONS = 10;

describe("Acceleration", () => {
    test("Constructor generates Acceleration", () => {
        const accel = new Cartesian(X_ACCEL, Y_ACCEL);
        const acceleration = new Acceleration(accel, MAX_SPEED, DRAG);

        expect(acceleration.acceleration.x).toEqual(X_ACCEL);
        expect(acceleration.acceleration.y).toEqual(Y_ACCEL);
        expect(acceleration.maxSpeed).toEqual(MAX_SPEED);
        expect(acceleration.drag).toEqual(DRAG);
    });

    test("Acceleration updates position on update", () => {
        const gameObject = new GameObject();
        const accel = new Cartesian(X_ACCEL, Y_ACCEL);
        const acceleration = new Acceleration(accel);
        gameObject.addComponent(acceleration);

        gameObject.update(ELAPSED_TIME);

        expect(gameObject.transform.x).toEqual(X_ACCEL * ELAPSED_TIME);
        expect(gameObject.transform.y).toEqual(Y_ACCEL * ELAPSED_TIME);
    });

    test("Acceleration accelerates", () => {
        const gameObject = new GameObject();
        const accel = new Cartesian(X_ACCEL, Y_ACCEL);
        const acceleration = new Acceleration(accel);
        gameObject.addComponent(acceleration);

        gameObject.update(ELAPSED_TIME);
        gameObject.update(ELAPSED_TIME);

        // * 3 because second update should increase speed by twice as much
        expect(gameObject.transform.x).toEqual(X_ACCEL * ELAPSED_TIME * 3);
        expect(gameObject.transform.y).toEqual(Y_ACCEL * ELAPSED_TIME * 3);
    });

    test("Acceleration cannot exceed max speed", () => {
        const gameObject = new GameObject();
        const accel = new Cartesian(X_ACCEL, 0);
        const acceleration = new Acceleration(accel, MAX_SPEED);
        gameObject.addComponent(acceleration);

        for (let i = 0; i < ITERATIONS; i++) {
            gameObject.update(ELAPSED_TIME);
        }

        // since max speed is lower than the acceleration,
        // this is functionally velocity of max speed
        const expectedX = ITERATIONS * ELAPSED_TIME;
        expect(gameObject.transform.x).toBeCloseTo(expectedX);
        expect(gameObject.transform.y).toBeCloseTo(0);
    });

    test("drag will slow down Acceleration", () => {
        const gameObject = new GameObject();
        const accel = new Cartesian(X_ACCEL, 0);
        const acceleration = new Acceleration(accel, MAX_SPEED, DRAG);
        gameObject.addComponent(acceleration);

        for (let i = 0; i < ITERATIONS; i++) {
            gameObject.update(ELAPSED_TIME);
        }

        acceleration.acceleration.magnitude = 0;
        for (let i = 0; i < ITERATIONS; i++) {
            gameObject.update(ELAPSED_TIME);
        }

        const expectedX = 10.9990234375 // precomputed
        expect(gameObject.transform.x).toBeCloseTo(expectedX);
        expect(gameObject.transform.y).toBeCloseTo(0);
    });
});