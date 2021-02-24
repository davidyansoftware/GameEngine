class Follow extends DNA.Component {
    constructor(target) {
        super();

        this.target = target;
    }

    update(deltaTime) {
        this.transform.position.absoluteX = this.target.transform.position.absoluteX;
        this.transform.position.absoluteY = this.target.transform.position.absoluteY;
    }
}