class Follow extends DNA.Component {
    constructor(target) {
        super();

        this.target = target;
    }

    update(deltaTime) {
        this.transform.absoluteX = this.target.transform.absoluteX;
        this.transform.absoluteY = this.target.transform.absoluteY;
    }
}