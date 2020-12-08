class MeleeWeapon extends DNA.Component {
    constructor(root, maxCooldown) {
        super();

        this.root = root;
        this.maxCooldown = maxCooldown;

        this.cooldown = 0;
    }

    update(deltaTime) {
        this.cooldown -= deltaTime;
    }

    attack(attacker, mouse) {
        if (this.cooldown > 0) {
            return;
        }

        const meleeAttack = createMeleeAttack(attacker.transform.x, attacker.transform.y, 50, .05);

        this.root.addGameObject(meleeAttack);

        this.cooldown = this.maxCooldown;
    }

    setPosition(position) {
        // not needed for melee
    }
}

function createMeleeWeapon(root, maxCooldown) {
    const meleeWeapon = new DNA.GameObject(0,0,0,new DNA.Shapes.Circle(1));
    meleeWeapon.addComponent(new DNA.Components.Renderer());
    const meleeWeaponComponent = new MeleeWeapon(root, maxCooldown);
    meleeWeapon.addComponent(meleeWeaponComponent);

    return meleeWeaponComponent;
}