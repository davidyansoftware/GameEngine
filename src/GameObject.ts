import Component from "./Component";
import Transform from "./Transform";
import Shape from "./Shape";
import Circle from "./shapes/Circle";

interface GameObjectParameters {
  x?: number,
  y?: number,
  rotation?: number,
  shape?: Shape
}

/**
 * GameObjects store game entities and logic
 * GameObjects are composites that propagate call to children GameObjects
 * GameObjects hold Components which handle game logic
 */
export default class GameObject {
  gameObjects: Array<GameObject> = [];
  components: Array<Component> = [];

  private _transform: Transform;
  private _parent?: GameObject;
  
  private _dead: boolean = false;

  /**
   * Create a GameObject
   * @param {number} x - The x-coordinate for the GameObject's Transform
   * @param {number} y - The y-coordinate for the GameObject's Transform
   * @param {number} rotation - The rotation for the GameObject's Transform
   */
  constructor({
    x = 0,
    y = 0,
    rotation = 0,
    shape = new Circle(0)
  }: GameObjectParameters = {}) {
    this._transform = new Transform(this, x, y, rotation, shape);
  }

  /**
   * This GameObject
   * @type {GameObject}
   */
  get gameObject(): GameObject {
    return this;
  }

  /**
   * The Transform of this GameObject
   * @type {Transform}
   */
  get transform(): Transform {
    return this._transform;
  }

  /**
   * This GameObject's parent
   * @type {GameObject}
   */
  get parent(): GameObject | undefined {
    return this._parent;
  }

  /**
   * Add a child GameObject
   * @param {GameObject} gameObject - The child game object
   * @param {boolean} maintainAbsolutePosition - GameObject should maintain its absolute position
   * @param {boolean} maintainAbsoluteRotation  - Gamebject should maintain its absolute rotation
   */
  addGameObject(
    gameObject: GameObject,
    maintainAbsolutePosition: boolean = false,
    maintainAbsoluteRotation: boolean = false
  ) {
    let prevAbsoluteX = 0;
    let prevAbsoluteY = 0;
    let prevAbsoluteRotation = 0;
    if (gameObject._parent) {
      if (maintainAbsolutePosition) {
        prevAbsoluteX = gameObject.transform.absoluteX;
        prevAbsoluteY = gameObject.transform.absoluteY;
      }
      if (maintainAbsoluteRotation) {
        prevAbsoluteRotation = gameObject.transform.absoluteRotation;
      }
      gameObject._parent.removeGameObject(gameObject);
    }
    gameObject._parent = this;
    this.gameObjects.push(gameObject);

    if (gameObject._parent && maintainAbsolutePosition) {
      gameObject.transform.absoluteX = prevAbsoluteX;
      gameObject.transform.absoluteY = prevAbsoluteY;
    }
    if (gameObject._parent && maintainAbsoluteRotation) {
      gameObject.transform.absoluteRotation = prevAbsoluteRotation;
    }

    gameObject.transform._cacheAbsolutePosition();
  }

  /**
   * Remove a child GameObject if it exists
   * @param {GameObject} gameObject
   */
  removeGameObject(gameObject: GameObject): void {
    let index = this.gameObjects.indexOf(gameObject);
    if (index >= 0) {
      this.gameObjects.splice(index, 1);
    }

    gameObject.transform._cacheAbsolutePosition();
  }

  /**
   * Add a Component
   * @param {Component} component - Component to be added
   */
  addComponent(component: Component): void {
    component._gameObject = this;
    this.components.push(component);
  }

  /**
   * Remove a Component if it exists
   * @param {Component} component - Component to be removed
   */
  removeComponent(component: Component): void {
    let index = this.components.indexOf(component);
    if (index >= 0) {
      this.components.splice(index, 1);
    }
  }

  /**
   * Updates the GameObject and all children GameObjects by updating all components
   * Game logic is handled within component updates
   * Called by the GameLoop every frame
   * Can also be called manually
   * @param {number} deltaTime - The time elapsed since the previous update
   */
  update(deltaTime: number): void {
    this.components.forEach(component => {
      component.update(deltaTime);
    });
    this.gameObjects.forEach(gameObject => {
      gameObject.update(deltaTime);
    });
    this.gameObjects.forEach(gameObject => {
      if (gameObject._dead) {
        gameObject._destroyNow();
      }
    });
  }

  /**
   * Renders the GameObject and all children GameObjects by rendering all components
   * Canvas rendering is handled within component renders
   * Called by Cameras every frame
   * Can also be called manually
   * @param {CanvasRenderingContext2D} ctx - The context to be rendered on
   */
  render(ctx: CanvasRenderingContext2D): void {
    this.components.forEach(component => {
      component.render(ctx);
    });
    this.gameObjects.forEach(gameObject => {
      // translating transform for each child so we don't have to translate after finding absolute offsets
      ctx.save();
      ctx.translate(gameObject.transform.x, -gameObject.transform.y);
      ctx.rotate(gameObject.transform.rotation);

      gameObject.render(ctx);

      ctx.restore();
    });
  }

  /**
   * Destroys the GameObject by removing itself from its parent.
   * Will delay until next update so this object will exist for the rest of the update cycle
   */
  destroy(): void {
    this._dead = true;
  }

  _destroyNow(): void {
    this._parent?.removeGameObject(this);
  }
}