import Component from "../Component";
import GameObject from "../GameObject";

export default class ExcludingBoundary extends Component {
    private excludes: Array<GameObject>;

    constructor(excludes: Array<GameObject> = []) {
        super();

        this.excludes = excludes;
    }

    update(deltaTime: number) {
        this.excludes.forEach((excluded) => {
            this.transform?.shape._exclude(this.gameObject, excluded);
        })
    }
}