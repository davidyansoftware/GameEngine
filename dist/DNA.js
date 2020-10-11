var DNA = (function () {
  'use strict';

  /**
   * Transform store positional information about GameObjects
   */
  class Transform {
    /**
     * Create a Transform
     * @param {GameObject} gameObject - The GameObject this Transform is attached to
     * @param {number} x - The x-coordinate
     * @param {number} y - The y-coordinate
     * @param {number} rotation - The rotation in radians
     */
    constructor(gameObject, x = 0, y = 0, rotation = 0) {
      this._gameObject = gameObject;
      this._x = x;
      this._y = y;
      this._rotation = rotation;

      this._cacheAbsolutePosition();
    }

    /**
     * The GameObject this Transform is attached to
     * @type {GameObject}
     */
    get gameObject() {
      return this._gameObject;
    }

    /**
     * The Transform of this GameObject
     * @type {Transform}
     */
    get transform() {
      return this;
    }

    /**
     * The x-coordinate of the GameObject
     * @type {number}
     */
    get x() {
      return this._x;
    }
    set x(value) {
      this._x = value;
      this._absoluteDirty = true;
    }

    /**
     * The y-coordinate of the GameObject
     * @type {number}
     */
    get y() {
      return this._y;
    }
    set y(value) {
      this._y = value;
      this._absoluteDirty = true;
    }

    /**
     * The rotation of the GameObject
     * @type {number}
     */
    get rotation() {
      return this._rotation;
    }
    set rotation(value) {
      this._rotation = value;
      this._absoluteDirty = true;
    }

    /**
     * The x-coordinate relative to the root GameObject
     * @type {number}
     */
    get absoluteX() {
      if (this._absoluteDirty) {
        this._cacheAbsolutePosition();
      }
      return this._absoluteX;
    }
    set absoluteX(value) {
      this._setAbsolutePosition(value, this.absoluteY);
    }

    /**
     * The y-coordinate relative to the root GameObject
     * @type {number}
     */
    get absoluteY() {
      if (this._absoluteDirty) {
        this._cacheAbsolutePosition();
      }
      return this._absoluteY;
    }
    set absoluteY(value) {
      this._setAbsolutePosition(this.absoluteX, value);
    }

    /**
     * The rotation relative to the root GameObject
     * @type {number}
     */
    get absoluteRotation() {
      if (this._absoluteDirty) {
        this._cacheAbsolutePosition();
      }
      return this._absoluteRotation;
    }
    set absoluteRotation(value) {
      this.rotation = value - this.gameObject.parent.transform.absoluteRotation;
    }

    _cacheAbsolutePosition() {
      const parentAbsoluteX = this.gameObject.parent
        ? this.gameObject.parent.transform.absoluteX
        : 0;
      const parentAbsoluteY = this.gameObject.parent
        ? this.gameObject.parent.transform.absoluteY
        : 0;
      const parentAbsoluteRotation = this.gameObject.parent
        ? this.gameObject.parent.transform.absoluteRotation
        : 0;

      // angle is negative to negate parent rotation
      const sin = Math.sin(-parentAbsoluteRotation);
      const cos = Math.cos(-parentAbsoluteRotation);

      this._absoluteX = this.x * cos - this.y * sin + parentAbsoluteX;
      this._absoluteY = this.x * sin + this.y * cos + parentAbsoluteY;
      this._absoluteRotation = parentAbsoluteRotation + this._rotation;

      this._absoluteDirty = false;
    }

    _setAbsolutePosition(x, y) {
      const parentAbsoluteX = this.gameObject.parent
        ? this.gameObject.parent.transform.absoluteX
        : 0;
      const parentAbsoluteY = this.gameObject.parent
        ? this.gameObject.parent.transform.absoluteY
        : 0;
      const parentAbsoluteRotation = this.gameObject.parent
        ? this.gameObject.parent.transform.absoluteRotation
        : 0;

      const offsetX = x - parentAbsoluteX;
      const offsetY = y - parentAbsoluteY;
      const sin = Math.sin(parentAbsoluteRotation);
      const cos = Math.cos(parentAbsoluteRotation);

      this.x = offsetX * cos - offsetY * sin;
      this.y = offsetX * sin + offsetY * cos;
    }
  }

  /**
   * GameObjects store game entities and logic
   * GameObjects are composites that propagate call to children GameObjects
   * GameObjects hold Components which handle game logic
   */
  class GameObject {
    /**
     * Create a GameObject
     * @param {number} x - The x-coordinate for the GameObject's Transform
     * @param {number} y - The y-coordinate for the GameObject's Transform
     * @param {number} rotation - The rotation for the GameObject's Transform
     */
    constructor(x = 0, y = 0, rotation = 0) {
      this._transform = new Transform(this, x, y, rotation);

      this.gameObjects = [];
      this.components = [];
    }

    /**
     * This GameObject
     * @type {GameObject}
     */
    get gameObject() {
      return this;
    }

    /**
     * The Transform of this GameObject
     * @type {Transform}
     */
    get transform() {
      return this._transform || null;
    }

    /**
     * Add a child GameObject
     * @param {GameObject} gameObject - The child game object
     * @param {boolean} maintainAbsolutePosition - GameObject should maintain its absolute position
     * @param {boolean} maintainAbsoluteRotation  - Gamebject should maintain its absolute rotation
     */
    addGameObject(
      gameObject,
      maintainAbsolutePosition = false,
      maintainAbsoluteRotation = false
    ) {
      let prevAbsoluteX;
      let prevAbsoluteY;
      let prevAbsoluteRotation;
      if (gameObject.parent) {
        if (maintainAbsolutePosition) {
          prevAbsoluteX = gameObject.transform.absoluteX;
          prevAbsoluteY = gameObject.transform.absoluteY;
        }
        if (maintainAbsoluteRotation) {
          prevAbsoluteRotation = gameObject.transform.absoluteRotation;
        }
        gameObject.parent.removeGameObject(gameObject);
      }
      gameObject.parent = this;
      this.gameObjects.push(gameObject);

      if (gameObject.parent && maintainAbsolutePosition) {
        gameObject.transform.absoluteX = prevAbsoluteX;
        gameObject.transform.absoluteY = prevAbsoluteY;
      }
      if (gameObject.parent && maintainAbsoluteRotation) {
        gameObject.transform.absoluteRotation = prevAbsoluteRotation;
      }

      gameObject.transform._cacheAbsolutePosition();
    }

    /**
     * Remove a child GameObject if it exists
     * @param {GameObject} gameObject
     */
    removeGameObject(gameObject) {
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
    addComponent(component) {
      component._gameObject = this;
      this.components.push(component);
    }

    /**
     * Remove a Component if it exists
     * @param {Component} component - Component to be removed
     */
    removeComponent(component) {
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
    update(deltaTime) {
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
    render(ctx) {
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
    destroy() {
      this._dead = true;
    }

    _destroyNow() {
      this.parent.removeGameObject(this);
    }
  }

  /**
   * GameLoop is responsible for updating game logic on every frame
   */
  class GameLoop {
    /**
     * Create a GameLoop
     * @param {GameObject} gameObject - The root GameObject to be updated
     */
    constructor(gameObject) {
      this.gameObject = gameObject;
      this._currAnimationFrame = window.requestAnimationFrame(currTime => {
        this.gameLoop(currTime);
      });
    }

    /**
     * gameLoop is responsible for calling the logic in the GameObject via update
     * gameLoop requests an animation frame and then recursively calls itself
     * @param {DOMHighResTimeStamp} - The current time passed by requestAnimationFrame
     * @return {number} The animation frame of the current request
     */
    gameLoop(currTime) {
      if (!this.prevTime) this.prevTime = currTime;
      let deltaTime = (currTime - this.prevTime) / 1000;
      this.prevTime = currTime;

      this.gameObject.update(deltaTime);

      return window.requestAnimationFrame(currTime => {
        this._currAnimationFrame = this.gameLoop(currTime);
      });
    }
  }

  /**
   * A base class for components of GameObjects
   */
  class Component {
    /**
     * Create a component
     */
    constructor() {}

    /**
     * The GameObject this Component is attached to
     * @type {GameObject}
     */
    get gameObject() {
      return this._gameObject || null;
    }

    /**
     * The Transform of the GameObject this Component is attached to
     * @type {Transform}
     */
    get transform() {
      return this.gameObject ? this.gameObject.transform : null;
    }

    /**
     * Runs game logic for this component every frame
     * To be implimented for individual components
     * Called by the GameLoop every frame
     * Can also be called manually
     * @param {number} deltaTime - The time elapsed since the previous update
     */
    update(deltaTime) {}

    /**
     * Renders the component every frame
     * To be implimented for individual components
     * Called by Cameras every frame
     * Can also be called manually
     * @param {CanvasRenderingContext2D} ctx - The context to be rendered on
     */
    render(ctx) {}
  }

  /**
   * A component for rendering GameObjects to canvas context
   * @extends Component
   */
  class Camera extends Component {
    /**
     *
     * @param {HTMLCanvasElement} canvas - The canvas to render to
     * @param {GameObject} root - The GameObject to be rendered
     */
    constructor(canvas, root) {
      super();

      this._canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.root = root;

      this._width = canvas.width;
      this._height = canvas.height;
      this._x = this._width / 2;
      this._y = this._height / 2;
      this.ctx.translate(this._x, this._y);
    }

    /**
     * Renders to context every frame
     * @param {number} currTime - The timestamp passed by requestAnimationFrame
     */
    update() {
      this.ctx.clearRect(-this._x, -this._y, this._width, this._height);

      this.ctx.save();

      const offsetX = this.root.transform.absoluteX - this.transform.absoluteX;
      const offsetY = this.root.transform.absoluteY - this.transform.absoluteY;
      const offsetRotation =
        this.root.transform.absoluteRotation - this.transform.absoluteRotation;

      this.ctx.rotate(offsetRotation);
      this.ctx.translate(offsetX, -offsetY);

      this.root.render(this.ctx);

      this.ctx.restore();
    }
  }

  /**
   * A component for rendering text
   * @extends Component
   */
  class Text extends Component {
    /**
     * Create a Text
     * @param {string} text - The text to be rendered
     */
    constructor(text) {
      super();

      this.text = text;
    }

    /**
     * Renders the text
     * @param {CanvasRenderingContext2D} ctx - The context to be rendered on
     */
    render(ctx) {
      ctx.font = "12px serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(this.text, 0, 0);
    }
  }

  /**
   * A component that renders a shape
   * @extends Component
   */
  class Renderer extends Component {
    /**
     * The type of shape to render
     * @param {Shape} shape
     */
    constructor(shape) {
      super();

      this.shape = shape;
    }

    render(ctx) {
      ctx.strokeStyle = "black";
      this.shape.render(ctx);
    }
  }

  /**
   * A component for determining if GameObjects are colliding
   * @extends Component
   */
  class Hitbox extends Component {
    /**
     * The shape of this Hitbox
     * @param {Shape} shape
     */
    constructor(shape, hurtboxes = []) {
      super();

      this.shape = shape;
      this._hurtboxes = hurtboxes;

      this._onHit = [];

      this._isHitting = {};
    }

    /**
     * Checks for collisions every frame and handles callbacks
     * @param {*} hurtbox
     */
    update(deltaTime) {
      for (const hurtbox of this._hurtboxes) {
        const isHitting = this.shape.isHitting(this, hurtbox);
        if (isHitting) {
          this._isHitting[hurtbox] = true;
          hurtbox._isHitting[this] = true;
          for (const callback of this._onHit) {
            callback(this, hurtbox);
          }
        } else {
          this._isHitting[hurtbox] = false;
          hurtbox._isHitting[this] = false;
        }
      }
    }

    /**
     * A callback function for handling on hit events
     * @callback hitCallback
     * @param {GameObject} self
     * @param {GameObject} hurtbox
     */

    /**
     * A callback function for OnHit
     * @param {hitCallback}
     */
    addOnHit(hitCallback) {
      this._onHit.push(hitCallback);
    }

    /**
     * Is this colliding with another Hitbox
     * @param {Hitbox} hurtbox
     */
    isHitting(hurtbox) {
      return this._isHitting[hurtbox];
    }
  }

  /**
   * A component for handling movement of GameObjects
   * @extends Component
   */
  class Physics extends Component {
    /**
     *
     * @param {number} x - Pixels to move horizontally every second
     * @param {number} y - Pixels to move vertically every second
     */
    constructor(x, y) {
      super();

      this.x = x;
      this.y = y;
    }

    /**
     * Updates position every frame
     * @param {number} deltaTime - The time elapsed since the previous update
     */
    update(elapsedTime) {
      this.gameObject.transform.x += this.x * elapsedTime;
      this.gameObject.transform.y += this.y * elapsedTime;
    }
  }

  /**
   * Represents a type of input
   */
  class Input {
    constructor(pressDown, pressUp, eventPressable) {
      this._pressables = {};

      document.addEventListener(pressDown, event => {
        const pressableCode = event[eventPressable];
        const pressable = this._pressables[pressableCode];
        if (pressable) {
          pressable._pressed = true;
        }

        for (const pressableCode in this._pressables) {
          const pressable = this._pressables[pressableCode];
          for (const callback of pressable._onPressDown) {
            callback(event);
          }
        }
      });

      document.addEventListener(pressUp, event => {
        const pressableCode = event[eventPressable];
        const pressable = this._pressables[pressableCode];
        if (pressable) {
          pressable._pressed = false;
        }

        for (const pressableCode in this._pressables) {
          const pressable = this._pressables[pressableCode];
          for (const callback of pressable._onPressUp) {
            callback(event);
          }
        }
      });
    }
  }

  /**
   * Handles logic for oressable input
   */
  class Pressable {
    constructor() {
      this._pressed = false;

      this._onPressDown = [];
      this._onPressUp = [];
    }

    /**
     * If this key is currently pressed
     * @type {boolean}
     */
    get pressed() {
      return this._pressed;
    }
  }

  /**
   * Handles logic for a mouse button
   * @extends Pressable
   */
  class MouseButton extends Pressable {
    constructor() {
      super();
    }

    /**
     * This callback type is for key event callbacks
     *
     * @callback mouseCallback
     * @param{MouseEvent} event
     */

    /**
     * Add a function to call on keydown event
     * @param {mouseCallback} onMouseDown - Function to be called on keydown event
     */
    addMouseDown(onMouseDown) {
      this._onPressDown.push(onMouseDown);
    }

    /**
     * Add a function to call on keyup event
     * @param {mouseCallback} onMouseUp - Function to be called on keyup event
     */
    addMouseUp(onMouseUp) {
      this._onPressUp.push(onMouseUp);
    }
  }

  /**
   * A class to handle mouse inputs
   * @extends Input
   */
  class Mouse extends Input {
    /**
     * Create a Mouse object
     */
    constructor(camera) {
      super("mousedown", "mouseup", "button");

      this._x = 0;
      this._y = 0;

      this.camera = camera;

      // this will not call _onMouseMove directly
      document.addEventListener("mousemove", event => {
        this._onMouseMove(event);
      });
    }

    /**
     * Gets the MouseButton cooresponding to this mouse event
     * @param {number} mouseButton - The button code for this mouse button
     */
    getButton(buttonCode) {
      let button = this._pressables[buttonCode];
      if (button) {
        return button;
      }

      button = new MouseButton();
      this._pressables[buttonCode] = button;
      return button;
    }

    /**
     * @type {number}
     */
    get x() {
      return this._x;
    }

    /**
     * @type {number}
     */
    get y() {
      return this._y;
    }

    _onMouseMove(event) {
      const rect = this.camera._canvas.getBoundingClientRect();
      this._x = event.clientX - Math.round(rect.left - 0.5) - this.camera._x;
      this._y = -(event.clientY - Math.round(rect.top - 0.5) - this.camera._y);
    }
  }

  /**
   * Handles logic for a key on the Keyboard
   * @extends Pressable
   */
  class Key extends Pressable {
    constructor() {
      super();
    }

    /**
     * This callback type is for key event callbacks
     *
     * @callback keyCallback
     * @param{KeyboardEvent} event
     */

    /**
     * Add a function to call on keydown event
     * @param {keyCallback} onKeyDown - Function to be called on keydown event
     */
    addKeyDown(onKeyDown) {
      this._onPressDown.push(onKeyDown);
    }

    /**
     * Add a function to call on keyup event
     * @param {keyCallback} onKeyUp - Function to be called on keyup event
     */
    addKeyUp(onKeyUp) {
      this._onPressUp.push(onKeyUp);
    }
  }

  /**
   * Represents keys on the user's keyboard
   * @extends Input
   */
  class Keyboard extends Input {
    /**
     * Create a Keyboard object
     */
    constructor() {
      super("keydown", "keyup", "keyCode");
    }

    /**
     * Gets the Key cooresponding to this keycode
     * @param {number} keyCode - The javascript keycode for this Key
     */
    getKey(keyCode) {
      let key = this._pressables[keyCode];
      if (key) {
        return key;
      }

      key = new Key();
      this._pressables[keyCode] = key;
      return key;
    }
  }

  /**
   * A Circle
   *
   * @impliments {Shape}
   */
  class Circle {
    /**
     * Create a Circle object
     *
     * @param {number} radius - Radius of the circle
     */
    constructor(radius) {
      this.radius = radius;
    }

    render(ctx) {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    isHitting(self, hurtbox) {
      return hurtbox.shape._isHittingCircle(hurtbox, self);
    }

    _isHittingCircle(hitbox, self) {
      let distanceBetween = Math.sqrt(
        Math.pow(hitbox.transform.absoluteX - self.transform.absoluteX, 2) +
          Math.pow(hitbox.transform.absoluteY - self.transform.absoluteY, 2)
      );
      return distanceBetween <= hitbox.shape.radius + self.shape.radius;
    }
  }

  function recalculateCartesian(coordinate) {
    coordinate._x = Math.sin(coordinate._angle) * coordinate._magnitude;
    coordinate._y = -Math.cos(coordinate._angle) * coordinate._magnitude;
    coordinate._dirtyCartesian = false;
  }

  //TODO can recalculate angle and magnitude seperately
  function recalculatePolar(coordinate) {
    coordinate._magnitude = Math.sqrt(
      Math.pow(coordinate._x, 2) + Math.pow(coordinate._y, 2)
    );
    coordinate._angle = Math.atan2(coordinate._y, coordinate._x) + Math.PI / 2;
    coordinate._dirtyPolar = false;
  }

  /**
   * Represent coordinates
   */
  class Coordinate {
    constructor() {
      this._x;
      this._y;

      this._magnitude;
      this._angle;

      this._dirtyCartesian;
      this._dirtyPolar;
    }

    get x() {
      if (this._dirtyCartesian) {
        recalculateCartesian(this);
      }

      return this._x;
    }
    set x(x) {
      if (this._dirtyCartesian) {
        recalculateCartesian(this);
      }

      this._x = x;
      this._dirtyPolar = true;
    }
    get y() {
      if (this._dirtyCartesian) {
        recalculateCartesian(this);
      }

      return this._y;
    }
    set y(y) {
      if (this._dirtyCartesian) {
        recalculateCartesian(this);
      }

      this._y = y;
      this._dirtyPolar = true;
    }

    get magnitude() {
      if (this._dirtyPolar) {
        recalculatePolar(this);
      }

      return this._magnitude;
    }
    set magnitude(magnitude) {
      if (this._dirtyPolar) {
        recalculatePolar(this);
      }

      this._magnitude = magnitude;
      this._dirtyCartesian = true;
    }
    get angle() {
      if (this._dirtyPolar) {
        recalculatePolar(this);
      }

      return this._angle;
    }
    set angle(angle) {
      if (this._dirtyPolar) {
        recalculatePolar(this);
      }

      this._angle = angle;
      this._dirtyCartesian = true;
    }
  }

  /**
   * Represent cartesian coordinates
   * @extends Coordinate
   */
  class Cartesian extends Coordinate {
    /**
     *
     * @param {number} x - The x value of the Coordinate
     * @param {number} y - The y value of the Coordinate
     */
    constructor(x, y) {
      super();

      this._x = x;
      this._y = y;

      this._dirtyPolar = true;
    }
  }

  /**
   * Represent polar coordinates
   * @extends Coordinate
   */
  class Polar extends Coordinate {
    /**
     *
     * @param {number} magnitude - The magnitude of the Coordinate
     * @param {number} angle - The angle of the Coordinate
     */
    constructor(magnitude, angle) {
      super();

      this._magnitude = magnitude;
      this._angle = angle;

      this._dirtyCartesian = true;
    }
  }

  var DNA$1 = DNA = {
    GameObject: GameObject,
    GameLoop: GameLoop,
    Component: Component,

    Components: {
      Camera: Camera,
      Text: Text,
      Renderer: Renderer,
      Hitbox: Hitbox,
      Physics: Physics
    },

    Input: {
      Mouse: Mouse
    },

    Shapes: {
      Circle: Circle
    },

    Coordinate: {
      Cartesian: Cartesian,
      Polar: Polar
    },

    get Keyboard() {
      if (!this._keyboard) {
        this._keyboard = new Keyboard();
      }
      return this._keyboard;
    }
  };

  return DNA$1;

}());
