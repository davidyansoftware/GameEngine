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
  
      assert.ok(hitboxCircle1.isHitting(hitbox1, hitbox2));
      assert.ok(hitboxCircle2.isHitting(hitbox2, hitbox1));
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
  
      assert.ok(hitboxCircle1.isHitting(hitbox1, hitbox2));
      assert.ok(hitboxCircle2.isHitting(hitbox2, hitbox1));
    });
  
    it("detects off-by-one", () => {
      const X = 0;
      const Y = 0;
      const RADIUS = 5;
      const X_OFFSET = RADIUS * 2 + 1;
  
      const hitboxCircle1 = new Circle(RADIUS);
      const hitboxGameObject1 = new GameObject(X, Y, 0, hitboxCircle1);
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const hitboxCircle2 = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject(X + X_OFFSET, Y, 0, hitboxCircle2);
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(!hitboxCircle1.isHitting(hitbox1, hitbox2));
      assert.ok(!hitboxCircle2.isHitting(hitbox2, hitbox1));
    });
  });

  describe("Circle on rectangle", () => {
    it("detects overlapping", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 5;
      const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
      const hitboxGameObject1 = new GameObject(X, Y, 0, hitboxRectangle);
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const RADIUS = 5;
      const hitboxCircle = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject(X, Y, 0, hitboxCircle);
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(hitboxRectangle.isHitting(hitbox1, hitbox2));
      assert.ok(hitboxCircle.isHitting(hitbox2, hitbox1));
    });
  
    it("detects touching", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 5;
  
      const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
      const hitboxGameObject1 = new GameObject(X, Y, 0, hitboxRectangle);
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const RADIUS = 5;
      const X_OFFSET = RADIUS + WIDTH / 2;
  
      const hitboxCircle = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject(X + X_OFFSET, Y, 0, hitboxCircle);
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(hitboxRectangle.isHitting(hitbox1, hitbox2));
      assert.ok(hitboxCircle.isHitting(hitbox2, hitbox1));
    });
  
    it("detects off-by-one", () => {
      const X = 0;
      const Y = 0;
      const WIDTH = 5;
      const HEIGHT = 5;
  
      const hitboxRectangle = new Rectangle(WIDTH, HEIGHT);
      const hitboxGameObject1 = new GameObject(X, Y, 0, hitboxRectangle);
      const hitbox1 = new Hitbox();
      hitboxGameObject1.addComponent(hitbox1);
  
      const RADIUS = 5;
      const X_OFFSET = RADIUS + WIDTH / 2 + 1;
  
      const hitboxCircle = new Circle(RADIUS);
      const hitboxGameObject2 = new GameObject(X + X_OFFSET, Y, 0, hitboxCircle);
      const hitbox2 = new Hitbox();
      hitboxGameObject2.addComponent(hitbox2);
  
      assert.ok(!hitboxRectangle.isHitting(hitbox1, hitbox2));
      assert.ok(!hitboxCircle.isHitting(hitbox2, hitbox1));
    });
  });