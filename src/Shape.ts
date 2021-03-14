import GameObject from "./GameObject";
import Transform from "./Transform";

/**
 * Interface for types of shapes
 * Used in drawing Shapes and determining collisions in Hitboxes
 *
 * @interface Shape
 */

/**
 * Render the Shape on the given context
 *
 * @function
 * @name Shape#render
 * @param {CanvasRenderingContext2D} ctx - The context to render the Shape on
 */

/**
 * Determine if the Shape is colliding with another Shape
 *
 * @function
 * @name Shape#isHitting
 * @param {Hitbox} self - The Shape's Hitbox
 * @param {Hitbox} other - The Hitbox to test against
 * @returns {boolean} true if the Hitboxes are colliding
 */

export default interface Shape {
   createTransform(gameObject: GameObject, x: number, y: number): Transform;

   render(ctx: CanvasRenderingContext2D, fill: boolean): void;

   isEnclosing(self: Transform, other: Transform): boolean;
   isExcluding(self: Transform, other: Transform): boolean;

   _enclose(self: Transform, other: Transform): void;
   _exclude(self: Transform, other: Transform): void;

   _isEnclosedByCircle(self: Transform, other: Transform): boolean;
   _isExcludedByCircle(self: Transform, other: Transform): boolean;
   _becomeEnclosedByCircle(self: Transform, other: Transform): void;
   _becomeExcludedByCircle(self: Transform, other: Transform): void;

   _isEnclosedByRectangle(self: Transform, other: Transform): boolean;
   _isExcludedByRectangle(self: Transform, other: Transform): boolean;
} 