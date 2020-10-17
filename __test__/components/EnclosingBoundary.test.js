import Circle from "../../src/shapes/Circle";
import EnclosingBoundary from "../../src/components/EnclosingBoundary";
import GameObject from "../../src/GameObject";

const ENCLOSING_RADIUS = 10;
const ENCLOSING_SHAPE = new Circle(ENCLOSING_RADIUS);
const ENCLOSED_RADIUS = 5;
const ENCLOSED_SHAPE = new Circle(ENCLOSED_RADIUS);

const ELAPSED_TIME = 1;

describe("Enclosing Boundary", () => {
    test("Enclosed GameObject isn't affected", () => {
        const X = 0;
        const Y = 0;

        const enclosedGameObject = new GameObject(X,Y,0,ENCLOSED_SHAPE);
        const enclosedGameObjects = [enclosedGameObject];

        const enclosingGameObject = new GameObject(X,Y,0,ENCLOSING_SHAPE);
        const enclosingBoundary = new EnclosingBoundary(enclosedGameObjects);
        enclosingGameObject.addComponent(enclosingBoundary);

        enclosingGameObject.update(ELAPSED_TIME);

        expect(enclosedGameObject.transform.x).toBe(X);
        expect(enclosedGameObject.transform.y).toBe(Y);
    });

    test("Exceeding enclosure will reposition", () => {
        const X = 0;
        const Y = 0;

        const X_OFFSET = ENCLOSING_RADIUS * 2;

        const enclosedGameObject = new GameObject(X + X_OFFSET,Y,0,ENCLOSED_SHAPE);
        const enclosedGameObjects = [enclosedGameObject];

        const enclosingGameObject = new GameObject(X,Y,0,ENCLOSING_SHAPE);
        const enclosingBoundary = new EnclosingBoundary(enclosedGameObjects);
        enclosingGameObject.addComponent(enclosingBoundary);

        enclosingGameObject.update(ELAPSED_TIME);

        expect(enclosedGameObject.transform.x).toBeCloseTo(ENCLOSING_RADIUS - ENCLOSED_RADIUS - 1);
        expect(enclosedGameObject.transform.y).toBeCloseTo(Y);
    });
});