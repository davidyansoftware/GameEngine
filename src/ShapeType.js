/**
 * Interface for types of shapes
 * Used in drawing Shapes and determining collisions in Hitboxes
 *
 * @interface ShapeType
 */

/**
 * Render the ShapeType on the given context
 *
 * @function
 * @name ShapeType#render
 * @param {CanvasRenderingContext2D} ctx - The context to render the ShapeType on
 */

/**
 * Determine if the ShapeType is colliding with another ShapeType
 *
 * @function
 * @name ShapeType#isHitting
 * @param {Hitbox} self - The ShapeType's Hitbox
 * @param {Hitbox} hurtbox - The Hitbox to test against
 * @returns {boolean} true if the Hitboxes are colliding
 */
