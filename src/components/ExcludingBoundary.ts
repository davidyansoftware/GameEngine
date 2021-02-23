import Component from "../Component";
import Transform from "../Transform";

export default class ExcludingBoundary extends Component {
    private excludes: Array<Transform>;

    constructor(excludes: Array<Transform> = []) {
        super();

        this.excludes = excludes;
    }

    update(deltaTime: number) {
        this.excludes.forEach((excluded) => {
            this.transform?.shape._exclude(this.transform, excluded);
        })
    }
}