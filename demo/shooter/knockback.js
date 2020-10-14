class Knockback extends DNA.Component {
    constructor(velocity, maxDistance) {
        super();

        this.velocity = velocity;
        this.maxDistance = maxDistance;

        this.distanceTraveled = 0;
    }

    update(deltaTime) {
        this.transform.x += this.velocity.x * deltaTime;
        this.transform.y += this.velocity.y * deltaTime;

        this.distanceTraveled += this.velocity.magnitude * deltaTime;
        if (this.distanceTraveled >= this.maxDistance) {
            this.gameObject.removeComponent(this);
        }
    }
}