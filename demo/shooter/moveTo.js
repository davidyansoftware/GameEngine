class MoveTo extends DNA.Component {
    constructor(target, speed, callback) {
        super();

        this.target = target;
        this.speed = speed;
        this.callback = callback;

        this.coordinate = new DNA.Coordinate.Cartesian(0, 0);
    }

    update(deltaTime) {
        if (this.move(deltaTime * this.speed)) {
            this.callback();
            this.gameObject.removeComponent(this);
        }
    }

    move(maxDistance) {
        this.coordinate.x = this.target.transform.position.absoluteX - this.transform.position.absoluteX;
        this.coordinate.y = this.target.transform.position.absoluteY - this.transform.position.absoluteY;

        if (maxDistance > this.coordinate.magnitude) {
          this.transform.position.absoluteX = this.target.transform.position.absoluteX;
          this.transform.position.absoluteY = this.target.transform.position.absoluteY;
          return true;
        } else {
          this.coordinate.magnitude = maxDistance;
          this.transform.position.absoluteX += this.coordinate.x;
          this.transform.position.absoluteY += this.coordinate.y;
          return false;
        }
    }
}