class MeleeWeapon extends DNA.Component {
    constructor(root, meleeWeaponType) {
        super();

        this.root = root;
        this.meleeWeaponType = meleeWeaponType;

        this.cooldown = 0;
    }

    update(deltaTime) {
        this.cooldown -= deltaTime;
    }

    attack(attacker, mouse) {
        if (this.cooldown > 0) {
            return;
        }

        const meleeAttack = createMeleeAttack(attacker.transform.x, attacker.transform.y, this.meleeWeaponType.radius, this.meleeWeaponType.duration);

        this.root.addGameObject(meleeAttack);

        this.cooldown = this.meleeWeaponType.cooldown;
    }

    setPosition(position) {
        // not needed for melee
    }
}

function createMeleeWeapon(root, meleeWeaponType) {
    const meleeWeapon = new DNA.GameObject(0,0,0,new DNA.Shapes.Circle(1));
    meleeWeapon.addComponent(new DNA.Components.Renderer());
    const meleeWeaponComponent = new MeleeWeapon(root, meleeWeaponType);
    meleeWeapon.addComponent(meleeWeaponComponent);

    return meleeWeaponComponent;
}