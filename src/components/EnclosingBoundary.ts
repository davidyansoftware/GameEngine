import Cartesian from "../coordinate/Cartesian";
import Circle from "../shapes/Circle";
import Coordinate from "../coordinate/Coordinate";
import Component from "../Component";
import GameObject from "../Component";

export default class EnclosingBoundary extends Component {
    private encloses: Array<GameObject>;
    private coordinate: Coordinate = new Cartesian(0,0);

    constructor(encloses: Array<GameObject> = []) {
        super();

        this.encloses = encloses;
    }

    update(deltaTime: number) {
        this.encloses.forEach((enclosed) => {
            if (this.transform == null || enclosed.transform == null) {
                return;
            }
            if (!this.transform?.shape.isEnclosing(this.gameObject, enclosed.gameObject)) {
                this.coordinate.x = enclosed.transform.absoluteX - this.transform.absoluteX;
                this.coordinate.y = enclosed.transform.absoluteY - this.transform.absoluteY;

                //TODO not typesafe, fix this
                const enclosingCircle: Circle = <Circle>this.transform.shape;
                const enclosedCircle: Circle = <Circle>enclosed.transform.shape;
                this.coordinate.magnitude = enclosingCircle.radius - enclosedCircle.radius - 1;

                enclosed.transform.absoluteX = this.transform.absoluteX + this.coordinate.x;
                enclosed.transform.absoluteY = this.transform.absoluteY + this.coordinate.y;
            }
        })
    }
}