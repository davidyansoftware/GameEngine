import Component from "../Component";
import Cartesian from "../coordinate/Cartesian";
import Coordinate from "../coordinate/Coordinate";

/**
 * A component that allows object manipulation with physical forces
 * @extends Component
 */
export default class PhysicalBody extends Component {
    drag: number;

    private velocity: Cartesian = new Cartesian(0, 0);

    constructor(drag: number) {
        super();

        this.drag = drag;
    }

    /**
    * Updates position based on current velocity, and applies drag
    */
    update(deltaTime: number) {
        //TODO how should this interact with absolute velocity?
        if (this.transform) {
            this.transform.x += this.velocity.x * deltaTime;
            this.transform.y += this.velocity.y * deltaTime;
        }
        
        this.velocity.magnitude *= 1 - this.drag;
    }

    addVelocity(velocity: Coordinate) {
        this.velocity.x += velocity.x;
        this.velocity.y += velocity.y;
    }

}