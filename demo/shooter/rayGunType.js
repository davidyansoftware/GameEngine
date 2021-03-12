const fastRayGun = {
    length: 200,
    
    cooldown: .1,
    recoilSpeed: 20,
    spread: Math.PI / 8,

    duration: 0
}

const normalRayGun = {
    length: 200,
    
    cooldown: .5,
    recoilSpeed: 50,
    spread: Math.PI / 16,

    duration: 0
};

const slowRayGun = {
    length: 300,

    cooldown: 1,
    recoilSpeed: 100,
    spread: 0,

    duration: 0
}