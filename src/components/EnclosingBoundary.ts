import Component from "../Component";
import GameObject from "../GameObject";

export default class EnclosingBoundary extends Component {
    private encloses: Array<GameObject>;

    constructor(encloses: Array<GameObject> = []) {
        super();

        this.encloses = encloses;
    }

    update(deltaTime: number) {
        this.encloses.forEach((enclosed) => {
            this.transform?.shape._enclose(this.gameObject, enclosed);
        })
    }
}