import * as assert from "assert";
import Circle from "../../src/shapes/Circle";
import Hitbox from "../../src/components/Hitbox";
import Rectangle from "../../src/shapes/Rectangle";
import GameObject from "../../src/GameObject";

describe("Circle on circle", () => {
    it("detects overlap", () => {
      const X = 0;
      const Y = 0;
      const RADIUS = 5;
      const hitboxCircle1 = new Circle(RADIUS);
      const hitboxGameObject1 = new GameObject(X, Y, 0, hitboxCircle1);
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const hitboxCircle2 = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject(X, Y, 0, hitboxCircle2);
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });
  
    it("detects touching", () => {
      const X = 0;
      const Y = 0;
      const RADIUS = 5;
      const X_OFFSET = RADIUS * 2;
  
      const hitboxCircle1 = new Circle(RADIUS);
      const hitboxGameObject1 = new GameObject(X, Y, 0, hitboxCircle1);
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const hitboxCircle2 = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject(X + X_OFFSET, Y, 0, hitboxCircle2);
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });
  
    it("detects off-by-one", () => {
      const X = 0;
      const Y = 0;
      const RADIUS = 5;
      const X_OFFSET = RADIUS * 2 + 1;
  
      const hitboxCircle1 = new Circle(RADIUS);
      const hitboxGameObject1 = new GameObject({x: X, y: Y, shape: hitboxCircle1});
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const hitboxCircle2 = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject({x: X + X_OFFSET, y: Y, shape: hitboxCircle2});
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(!hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(!hitbox2.transform.isHitting(hitbox1.transform));
    });

    it("detects moving in and out", () => {
      const X = 0;
      const Y = 0;
      const RADIUS = 5;
      const X_OFFSET = RADIUS * 2 + 1;
  
      const hitboxCircle1 = new Circle(RADIUS);
      const hitboxGameObject1 = new GameObject({x: X, y: Y, shape: hitboxCircle1});
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const hitboxCircle2 = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject({x: X, y: Y, shape: hitboxCircle2});
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));

      hitbox1.transform.position.x += X_OFFSET;

      assert.ok(!hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(!hitbox2.transform.isHitting(hitbox1.transform));

      hitbox1.transform.position.x = X;

      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });
  });

  describe("Circle on rectangle", () => {
    it("detects overlapping", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 5;
      const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
      const hitboxGameObject1 = new GameObject({x: X, y: Y, shape: hitboxRectangle});
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const RADIUS = 5;
      const hitboxCircle = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject({x: X, y: Y, shape: hitboxCircle});
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });
  
    it("detects touching", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 5;
  
      const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
      const hitboxGameObject1 = new GameObject({x: X, y: Y, shape: hitboxRectangle});
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const RADIUS = 5;
      const X_OFFSET = RADIUS + WIDTH / 2;
  
      const hitboxCircle = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject({x: X + X_OFFSET, y: Y, shape: hitboxCircle});
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });
  
    it("detects off-by-one", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 5;
  
      const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
      const hitboxGameObject1 = new GameObject({x: X, y: Y, shape: hitboxRectangle});
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const RADIUS = 5;
      const X_OFFSET = RADIUS + WIDTH / 2 + 1;
  
      const hitboxCircle = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject({x: X + X_OFFSET, y: Y, shape: hitboxCircle});
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(!hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(!hitbox2.transform.isHitting(hitbox1.transform));
    });

    it("detects moving in and out", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 5;
  
      const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
      const hitboxGameObject1 = new GameObject({x: X, y: Y, shape: hitboxRectangle});
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const RADIUS = 5;
      const X_OFFSET = RADIUS + WIDTH / 2 + 1;
  
      const hitboxCircle = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject({x: X, y: Y, shape: hitboxCircle});
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));

      hitbox1.transform.position.x += X_OFFSET;

      assert.ok(!hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(!hitbox2.transform.isHitting(hitbox1.transform));

      hitbox1.transform.position.x = X;

      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });
  });

  describe("Rectangle on rectangle", () => {
    it("detects overlap", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 10;
      
      const rect1 = new Rectangle(WIDTH, HEIGHT);
      const rect1GameObject = new GameObject({x: X, y: Y, shape: rect1});
      const hitbox1 = new Hitbox();
      rect1GameObject.addComponent(hitbox1);

      const rect2 = new Rectangle(WIDTH, HEIGHT);
      const rect2GameObject = new GameObject({x: X, y: Y, shape: rect2});
      const hitbox2 = new Hitbox();
      rect2GameObject.addComponent(hitbox2);

      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });

    it("detects touching", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 10;
      const X_OFFSET = WIDTH * 2;

      const rect1 = new Rectangle(WIDTH, HEIGHT);
      const rect1GameObject = new GameObject({x: X, y: Y, shape: rect1});
      const hitbox1 = new Hitbox();
      rect1GameObject.addComponent(hitbox1);

      const rect2 = new Rectangle(WIDTH, HEIGHT);
      const rect2GameObject = new GameObject({x: X + X_OFFSET, y: Y, shape: rect2});
      const hitbox2 = new Hitbox();
      rect2GameObject.addComponent(hitbox2);

      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });

    it("detects off-by-one", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 10;
      const X_OFFSET = WIDTH * 2 + 1;

      const rect1 = new Rectangle(WIDTH, HEIGHT);
      const rect1GameObject = new GameObject({x: X, y: Y, shape: rect1});
      const hitbox1 = new Hitbox();
      rect1GameObject.addComponent(hitbox1);

      const rect2 = new Rectangle(WIDTH, HEIGHT);
      const rect2GameObject = new GameObject({x: X + X_OFFSET, y: Y, shape: rect2});
      const hitbox2 = new Hitbox();
      rect2GameObject.addComponent(hitbox2);

      assert.ok(!hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(!hitbox2.transform.isHitting(hitbox1.transform));
    });

    it("detects moving in and out", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 10;
      const X_OFFSET = WIDTH * 2 + 1;
  
      const rect1 = new Rectangle(WIDTH, HEIGHT);
      const rect1GameObject = new GameObject({x: X, y: Y, shape: rect1});
      const hitbox1 = new Hitbox();
      rect1GameObject.addComponent(hitbox1);
  
      const rect2 = new Rectangle(WIDTH, HEIGHT);
      const rect2GameObject = new GameObject({x: X, y: Y, shape: rect2});
      const hitbox2 = new Hitbox();
      rect2GameObject.addComponent(hitbox2);
  
      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));

      hitbox1.transform.position.x += X_OFFSET;

      assert.ok(!hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(!hitbox2.transform.isHitting(hitbox1.transform));

      hitbox1.transform.position.x = X;

      assert.ok(hitbox1.transform.isHitting(hitbox2.transform));
      assert.ok(hitbox2.transform.isHitting(hitbox1.transform));
    });
  });