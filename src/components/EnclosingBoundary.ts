import Component from "../Component";
import Transform from "../Transform";

export default class EnclosingBoundary extends Component {
    private encloses: Array<Transform>;

    constructor(encloses: Array<Transform> = []) {
        super();

        this.encloses = encloses;
    }

    update(deltaTime: number) {
        this.encloses.forEach((enclosed) => {
            this.transform?.shape._enclose(this.transform, enclosed);
        })
    }
}