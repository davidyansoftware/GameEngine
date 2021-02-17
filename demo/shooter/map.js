class Map extends DNA.Component {
    constructor(lake, islands) {
        super();

        this.lake = lake;
        this.islands = islands;
    }

    getDrag(player) {
        const isInLake = this.lake.transform.shape.isEnclosing(this.lake, player);
        if (!isInLake) return .05;

        for(const island of this.islands) {
            if (island.transform.shape.isEnclosing(island.transform, player)) {
                return .05;
            }
        }

        return .2;
    }
}

const LAKE_RADIUS = 6500;

function createObstacle(players) {
    math.magnitude = 100 + Math.random() * 4900;
    math.angle = Math.PI + Math.random() * Math.PI;
    const radius = 20 + Math.random() * 40;
    const obstacle = new DNA.GameObject({x: math.x, y: math.y, shape: new DNA.Shapes.Circle(radius)});
    obstacle.addComponent(new DNA.Components.Renderer("lightgreen"));
    obstacle.addComponent(new DNA.Components.ExcludingBoundary(players));
    return obstacle;
}

function createIsland() {
    math.magnitude = Math.random() * LAKE_RADIUS;
    math.angle = Math.random() * Math.PI * 2;
    const radius = 200 + Math.random() * 400;
    const island = new DNA.GameObject({x: math.x, y: math.y, shape: new DNA.Shapes.Circle(radius)});
    island.addComponent(new DNA.Components.Renderer("#FFF0C9"));
    return island;
}


function createMap(players) {
    const map = new DNA.GameObject({shape: new DNA.Shapes.Circle(5000)});

    for(let i = 0; i < 300; i++) {
        map.addGameObject(createObstacle(players));
    }

    const lake = new DNA.GameObject({x: 7000, y: 2000, shape: new DNA.Shapes.Circle(LAKE_RADIUS)});
    lake.addComponent(new DNA.Components.Renderer("lightblue"));
    const islands = [];
    for (let i = 0; i < 50; i++) {
        const island = createIsland();
        lake.addGameObject(island);
        islands.push(island)
    }
    map.addGameObject(lake);
    
    map.addComponent(new DNA.Components.Renderer());
    map.addComponent(new DNA.Components.EnclosingBoundary(players));
    const mapComponent = new Map(lake, islands);
    map.addComponent(mapComponent);
    
    return mapComponent;
}