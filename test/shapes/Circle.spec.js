import * as assert from "assert";
import * as sinon from "sinon";
import Circle from "../../src/shapes/Circle";
import GameObject from "../../src/GameObject";
import Rectangle from "../../src/shapes/Rectangle";
import Canvas from "canvas";

describe("Circle render", () => {
  it("renders a circle", () => {
    const canvas = Canvas.createCanvas(100, 100);
    const ctx = canvas.getContext("2d");
    const arcSpy = sinon.spy(ctx, "arc");
    const strokeSpy = sinon.spy(ctx, "stroke");

    const RADIUS = 5;
    const circle = new Circle(RADIUS);

    //TODO test fill vs no fill, test all parameters
    circle.render(ctx, true);

    assert.ok(arcSpy.calledOnceWith(0, 0, RADIUS, 0, Math.PI * 2));
    assert.ok(strokeSpy.calledOnce);
  });
});

describe("Circle is enclosing", () => {
  it("detects enclosed", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X, Y, 0, innerCircle);

    assert.ok(outerCircle.isEnclosing(outerCircleGameObject, innerCircleGameObject));
  });
  
  it("detects off-by-one", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = INNER_RADIUS;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET - 1, Y, 0, innerCircle);

    assert.ok(outerCircle.isEnclosing(outerCircleGameObject, innerCircleGameObject));
  });

  it("detects touching enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = INNER_RADIUS;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    assert.ok(!outerCircle.isEnclosing(outerCircleGameObject, innerCircleGameObject));
  });

  it("detects outside enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = 20;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    assert.ok(!outerCircle.isEnclosing(outerCircleGameObject, innerCircleGameObject));
  });
});

describe("Circle is excluding", () => {
  it("detects enclosed", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X, Y, 0, innerCircle);

    assert.ok(!outerCircle.isExcluding(outerCircleGameObject, innerCircleGameObject));
  });

  it("detects touching enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = OUTER_RADIUS + INNER_RADIUS;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    assert.ok(!outerCircle.isExcluding(outerCircleGameObject, innerCircleGameObject));
  });

  it("detects off-by-one", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = OUTER_RADIUS + INNER_RADIUS;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET + 1, Y, 0, innerCircle);

    assert.ok(outerCircle.isExcluding(outerCircleGameObject, innerCircleGameObject));
  });

  it("detects outside enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_RADIUS = 10;
    const INNER_RADIUS = 5;
    const X_OFFSET = 20;

    const outerCircle = new Circle(OUTER_RADIUS);
    const outerCircleGameObject = new GameObject(X, Y, 0, outerCircle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    assert.ok(outerCircle.isExcluding(outerCircleGameObject, innerCircleGameObject));
  });
});

describe("Rectangle is enclosing", () => {
  it("detects Circle is enclosed", () => {
    const X = 0;
    const Y = 0;
    const OUTER_WIDTH = 20;
    const OUTER_HEIGHT = 20;
    const INNER_RADIUS = 5;

    const outerRectangle = new Rectangle(OUTER_WIDTH, OUTER_HEIGHT);
    const outerRectangleGameObject = new GameObject(X, Y, 0, outerRectangle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X, Y, 0, innerCircle);

    assert.ok(outerRectangle.isEnclosing(outerRectangleGameObject, innerCircleGameObject));
  });
  
  it("detects Circle off-by-one", () => {
    const X = 0;
    const Y = 0;
    const OUTER_WIDTH = 20;
    const OUTER_HEIGHT = 20;
    const INNER_RADIUS = 5;
    const X_OFFSET = OUTER_WIDTH / 2 - INNER_RADIUS;

    const outerRectangle = new Rectangle(OUTER_WIDTH, OUTER_HEIGHT);
    const outerRectangleGameObject = new GameObject(X, Y, 0, outerRectangle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET - 1, Y, 0, innerCircle);

    assert.ok(outerRectangle.isEnclosing(outerRectangleGameObject, innerCircleGameObject));
  });

  it("detects Circle touching enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_WIDTH = 20;
    const OUTER_HEIGHT = 20;
    const INNER_RADIUS = 5;
    const X_OFFSET = OUTER_WIDTH / 2 - INNER_RADIUS;

    const outerRectangle = new Rectangle(OUTER_WIDTH, OUTER_HEIGHT);
    const outerRectangleGameObject = new GameObject(X, Y, 0, outerRectangle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    assert.ok(!outerRectangle.isEnclosing(outerRectangleGameObject, innerCircleGameObject));
  });

  it("detects Circle outside enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_WIDTH = 20;
    const OUTER_HEIGHT = 20;
    const INNER_RADIUS = 5;
    const X_OFFSET = OUTER_WIDTH + INNER_RADIUS;

    const outerRectangle = new Rectangle(OUTER_WIDTH, OUTER_HEIGHT);
    const outerRectangleGameObject = new GameObject(X, Y, 0, outerRectangle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    assert.ok(!outerRectangle.isEnclosing(outerRectangleGameObject, innerCircleGameObject));
  });
});

describe("Rectangle is excluding", () => {
  it("detects Circle is enclosed", () => {
    const X = 0;
    const Y = 0;
    const OUTER_WIDTH = 20;
    const OUTER_HEIGHT = 20;
    const INNER_RADIUS = 5;

    const outerRectangle = new Rectangle(OUTER_WIDTH, OUTER_HEIGHT);
    const outerRectangleGameObject = new GameObject(X, Y, 0, outerRectangle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X, Y, 0, innerCircle);

    assert.ok(!outerRectangle.isExcluding(outerRectangleGameObject, innerCircleGameObject));
  });
  
  it("detects Circle touching enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_WIDTH = 20;
    const OUTER_HEIGHT = 20;
    const INNER_RADIUS = 5;
    const X_OFFSET = OUTER_WIDTH / 2 + INNER_RADIUS;

    const outerRectangle = new Rectangle(OUTER_WIDTH, OUTER_HEIGHT);
    const outerRectangleGameObject = new GameObject(X, Y, 0, outerRectangle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    assert.ok(!outerRectangle.isExcluding(outerRectangleGameObject, innerCircleGameObject));
  });

  it("detects Circle off-by-one", () => {
    const X = 0;
    const Y = 0;
    const OUTER_WIDTH = 20;
    const OUTER_HEIGHT = 20;
    const INNER_RADIUS = 5;
    const X_OFFSET = OUTER_WIDTH / 2 + INNER_RADIUS;

    const outerRectangle = new Rectangle(OUTER_WIDTH, OUTER_HEIGHT);
    const outerRectangleGameObject = new GameObject(X, Y, 0, outerRectangle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET + 1, Y, 0, innerCircle);

    assert.ok(outerRectangle.isExcluding(outerRectangleGameObject, innerCircleGameObject));
  });

  it("detects Circle outside enclosure", () => {
    const X = 0;
    const Y = 0;
    const OUTER_WIDTH = 20;
    const OUTER_HEIGHT = 20;
    const INNER_RADIUS = 5;
    const X_OFFSET = OUTER_WIDTH + INNER_RADIUS;

    const outerRectangle = new Rectangle(OUTER_WIDTH, OUTER_HEIGHT);
    const outerRectangleGameObject = new GameObject(X, Y, 0, outerRectangle);

    const innerCircle = new Circle(INNER_RADIUS);
    const innerCircleGameObject = new GameObject(X + X_OFFSET, Y, 0, innerCircle);

    assert.ok(outerRectangle.isExcluding(outerRectangleGameObject, innerCircleGameObject));
  });
});