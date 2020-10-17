import Cartesian from "../coordinate/Cartesian";
import Circle from "../shapes/Circle";
import Coordinate from "../coordinate/Coordinate";
import Component from "../Component";
import GameObject from "../Component";

export default class ExclodingBoundary extends Component {
    private excludes: Array<GameObject>;
    private coordinate: Coordinate = new Cartesian(0,0);

    constructor(excludes: Array<GameObject> = []) {
        super();

        this.excludes = excludes;
    }

    update(deltaTime: number) {
        this.excludes.forEach((excluded) => {
            if (this.transform == null || excluded.transform == null) {
                return;
            }
            if (!this.transform?.shape.isExcluding(this.gameObject, excluded.gameObject)) {
                this.coordinate.x = excluded.transform.absoluteX - this.transform.absoluteX;
                this.coordinate.y = excluded.transform.absoluteY - this.transform.absoluteY;

                //TODO not typesafe, fix this
                const excludingCircle: Circle = <Circle>this.transform.shape;
                const excludedCircle: Circle = <Circle>excluded.transform.shape;
                this.coordinate.magnitude = excludingCircle.radius + excludedCircle.radius + 1;

                excluded.transform.absoluteX = this.transform.absoluteX + this.coordinate.x;
                excluded.transform.absoluteY = this.transform.absoluteY + this.coordinate.y;
            }
        })
    }
}