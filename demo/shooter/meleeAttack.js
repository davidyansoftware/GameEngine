class MeleeAttack extends DNA.Component {
    constructor(maxDuration) {
        super();

        this.maxDuration = maxDuration;

        this.duration = 0;
    }

    update(deltaTime) {
        this.duration += deltaTime;

        if (this.duration >= this.maxDuration) {
            this.gameObject.destroy();
        }
    }

}

function createMeleeAttack(x, y, radius, duration) {
    const attack = new DNA.GameObject({x: x, y: y, shape: new DNA.Shapes.Circle(radius)});

    const meleeAttack = new MeleeAttack(duration);
    const renderer = new DNA.Components.Renderer();
    const hitbox = new DNA.Components.Hitbox();
    attack.addComponent(meleeAttack);
    attack.addComponent(renderer);
    attack.addComponent(hitbox);

    return attack;
}