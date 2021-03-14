import * as assert from "assert";
import * as testUtils from "./TestUtils";
import GameObject from "../src/GameObject";

describe("Position constructor", () => {
    it("defaults to (0,0,0)", () => {
      const gameObject = new GameObject();
      assert.equal(gameObject.transform.position.x, 0);
      assert.equal(gameObject.transform.position.y, 0);
    });
  
    it("getters match setters", () => {
      const X_VALUE = 1;
      const Y_VALUE = 2;
      const gameObject = new GameObject();
  
      gameObject.transform.position.x = X_VALUE;
      assert.equal(gameObject.transform.position.x, X_VALUE);
  
      gameObject.transform.position.y = Y_VALUE;
      assert.equal(gameObject.transform.position.y, Y_VALUE);
    });
  
    it("sets values", () => {
      const X_VALUE = 1;
      const Y_VALUE = 2;
      const gameObject = new GameObject({x: X_VALUE, y: Y_VALUE});
      assert.equal(gameObject.transform.position.x, X_VALUE);
      assert.equal(gameObject.transform.position.y, Y_VALUE);
    });
  });

describe("Transform absolute position", () => {
    it("includes parent's absolute position", () => {
      const GRAND_PARENT_X = 1;
      const GRAND_PARENT_Y = 2;
      const grandParent = new GameObject({x: GRAND_PARENT_X, y: GRAND_PARENT_Y});
      assert.equal(grandParent.transform.position.absoluteX, GRAND_PARENT_X);
      assert.equal(grandParent.transform.position.absoluteY, GRAND_PARENT_Y);
  
      const PARENT_X = 3;
      const PARENT_Y = 4;
      const parent = new GameObject({x: PARENT_X, y: PARENT_Y});
      grandParent.addGameObject(parent);
      assert.equal(parent.transform.position.absoluteX, GRAND_PARENT_X + PARENT_X);
      assert.equal(parent.transform.position.absoluteY, GRAND_PARENT_Y + PARENT_Y);
  
      const CHILD_X = 5;
      const CHILD_Y = 6;
      const child = new GameObject({x: CHILD_X, y: CHILD_Y});
      parent.addGameObject(child);
      assert.equal(child.transform.position.absoluteX, GRAND_PARENT_X + PARENT_X + CHILD_X);
      assert.equal(child.transform.position.absoluteY, GRAND_PARENT_Y + PARENT_Y + CHILD_Y);
    });
  
    it("is updated when its position changes", () => {
      const X_VALUE = 1;
      const Y_VALUE = 2;
      const gameObject = new GameObject({x: X_VALUE, y: Y_VALUE});
  
      const OFFSET_X = 3;
      const OFFSET_Y = 4;
  
      // test after each change to reset the dirty flag
      gameObject.transform.position.x += OFFSET_X;
      assert.equal(gameObject.transform.position.absoluteX, X_VALUE + OFFSET_X);
  
      gameObject.transform.position.y += OFFSET_Y;
      assert.equal(gameObject.transform.position.absoluteY, Y_VALUE + OFFSET_Y);
    });
  
    it("is updated when its parent's position changes", () => {
      const PARENT_X = 1;
      const PARENT_Y = 2;
      const parent = new GameObject({x: PARENT_X, y: PARENT_Y});
  
      const CHILD_X = 3;
      const CHILD_Y = 4;
      const child = new GameObject({x: CHILD_X, y: CHILD_Y});
      parent.addGameObject(child);
  
      const OFFSET_X = 5;
      const OFFSET_Y = 6;
  
      // test after each change to reset the dirty flag
      parent.transform.position.x += OFFSET_X;
      assert.equal(child.transform.position.absoluteX, PARENT_X + CHILD_X + OFFSET_X);
  
      parent.transform.position.y += OFFSET_Y;
      assert.equal(child.transform.position.absoluteY, PARENT_Y + CHILD_Y + OFFSET_Y);
    });
  
    it("updates position", () => {
      const PARENT_X = 1;
      const PARENT_Y = 2;
      const parent = new GameObject({x: PARENT_X, y: PARENT_Y});
      const child = new GameObject();
      parent.addGameObject(child);
  
      const CHILD_ABSOLUTE_X = 3;
      const CHILD_ABSOLUTE_Y = 4;
  
      child.transform.position.absoluteX = CHILD_ABSOLUTE_X;
      assert.equal(child.transform.position.x, CHILD_ABSOLUTE_X - PARENT_X);
  
      child.transform.position.absoluteY = CHILD_ABSOLUTE_Y;
      assert.equal(child.transform.position.y, CHILD_ABSOLUTE_Y - PARENT_Y);
  
      // ensure changing the child didn't change the parent's position
      assert.equal(parent.transform.position.x, PARENT_X);
      assert.equal(parent.transform.position.y, PARENT_Y);
      assert.equal(parent.transform.position.absoluteX, PARENT_X);
      assert.equal(parent.transform.position.absoluteY, PARENT_Y);
    });
  });
  
  describe("Transform GetAbsolutePosition", () => {
    it("defaults to zero", () => {
        const gameObject = new GameObject();

        testUtils.assertAlmostEqual(gameObject.transform.position.getAbsoluteX(), 0);
        testUtils.assertAlmostEqual(gameObject.transform.position.getAbsoluteY(), 0);
    });
    
    it("returns correct offsets for unrotated object", () => {
        const X_OFFSET = 5;
        const Y_OFFSET = 10;
        const gameObject = new GameObject();
    
        testUtils.assertAlmostEqual(gameObject.transform.position.getAbsoluteX(X_OFFSET, Y_OFFSET), X_OFFSET);
        testUtils.assertAlmostEqual(gameObject.transform.position.getAbsoluteY(X_OFFSET, Y_OFFSET), Y_OFFSET);
    });
  });