import Circle from "../../src/shapes/Circle";
import ExcludingBoundary from "../../src/components/ExcludingBoundary";
import GameObject from "../../src/GameObject";

const RADIUS = 5;
const EXCLUDING_SHAPE = new Circle(RADIUS);
const EXCLUDED_SHAPE = new Circle(RADIUS);

const ELAPSED_TIME = 1;

describe("Excluding Boundary", () => {
    test("Excluded GameObject isn't affected", () => {
        const X = 0;
        const Y = 0;

        const X_OFFSET = RADIUS * 3;

        const excludedGameObject = new GameObject(X + X_OFFSET,Y,0,EXCLUDED_SHAPE);
        const excludedGameObjects = [excludedGameObject];

        const excludingGameObject = new GameObject(X,Y,0,EXCLUDING_SHAPE);
        const excludingBoundary = new ExcludingBoundary(excludedGameObjects);
        excludingGameObject.addComponent(excludingBoundary);

        excludingGameObject.update(ELAPSED_TIME);

        expect(excludedGameObject.transform.x).toBeCloseTo(X + X_OFFSET);
        expect(excludedGameObject.transform.y).toBeCloseTo(Y);
    });

    test("Exceeding boundary will reposition", () => {
        const X = 0;
        const Y = 0;

        const excludedGameObject = new GameObject(X,Y,0,EXCLUDED_SHAPE);
        const excludedGameObjects = [excludedGameObject];

        const excludingGameObject = new GameObject(X,Y,0,EXCLUDING_SHAPE);
        const excludingBoundary = new ExcludingBoundary(excludedGameObjects);
        excludingGameObject.addComponent(excludingBoundary);

        excludingGameObject.update(ELAPSED_TIME);

        expect(excludedGameObject.transform.x).toBeCloseTo(RADIUS * 2 + 1);
        expect(excludedGameObject.transform.y).toBeCloseTo(Y);
    });
});