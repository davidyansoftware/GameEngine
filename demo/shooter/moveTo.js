const SPEED = 500;

class MoveTo extends DNA.Component {
    constructor(target, callback) {
        super();

        this.target = target;
        this.callback = callback;

        this.coordinate = new DNA.Coordinate.Cartesian(0, 0);
    }

    update(deltaTime) {
        if (this.move(deltaTime * SPEED)) {
            this.callback();
            this.gameObject.removeComponent(this);
        }
    }

    move(maxDistance) {
        this.coordinate.x = this.target.transform.absoluteX - this.transform.absoluteX;
        this.coordinate.y = this.target.transform.absoluteY - this.transform.absoluteY;

        if (maxDistance > this.coordinate.magnitude) {
          this.transform.absoluteX = this.target.transform.absoluteX;
          this.transform.absoluteY = this.target.transform.absoluteY;
          return true;
        } else {
          this.coordinate.magnitude = maxDistance;
          this.transform.absoluteX += this.coordinate.x;
          this.transform.absoluteY += this.coordinate.y;
          return false;
        }
    }
}