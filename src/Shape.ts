import Hitbox from "./components/Hitbox";

import Circle from "./shapes/Circle";

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
    render(ctx: CanvasRenderingContext2D): void;
    isHitting(self: Hitbox<any>, other: Hitbox<any>): boolean;

    _isHittingCircle(self: Hitbox<any>, other: Hitbox<Circle>): boolean;
 }