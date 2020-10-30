import Hitbox from "./components/Hitbox";
import GameObject from "./GameObject";

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
    render(ctx: CanvasRenderingContext2D, fill: boolean): void;
    isHitting(self: Hitbox, other: Hitbox): boolean;
    isEnclosing(self: GameObject | null, other: GameObject | null): boolean;
    isExcluding(self: GameObject | null, other: GameObject | null): boolean;

    _enclose(self: GameObject | null, other: GameObject | null): void;
    _exclude(self: GameObject | null, other: GameObject | null): void;

    _isHittingCircle(self: Hitbox, other: Hitbox): boolean;
    _isEnclosedByCircle(self: GameObject, other: GameObject): boolean;
    _isExcludedByCircle(self: GameObject, other: GameObject): boolean;
    _becomeEnclosedByCircle(self: GameObject | null, other: GameObject | null): void;
    _becomeExcludedByCircle(self: GameObject | null, other: GameObject | null): void;

    _isHittingRectangle(self: GameObject | null, other: GameObject | null): boolean;
    _isEnclosedByRectangle(self: GameObject, other: GameObject): boolean;
    _isExcludedByRectangle(self: GameObject, other: GameObject): boolean;
 }