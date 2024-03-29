const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const graph = urlParams.get('graph') || "0"
const segment = urlParams.get('segment') || "10"
document.getElementById("graph").value = graph
document.getElementById("segment").value = segment
console.log(graph)
console.log(segment)

var slider = document.getElementById("dens");
var slider2 = document.getElementById("fAir");
var slider3 = document.getElementById("f");
var cBall = document.getElementById("cBall");
var density = document.getElementById("density");
var airFric = document.getElementById("airFric");
var Fric = document.getElementById("fric");
var dens = 1;
var fAir = 0.01;
var f = 0.01;

slider.oninput = function () {
    dens = this.value;
    density.innerHTML = dens;
    slider.innerHTML = dens;
}

slider2.oninput = function () {
    fAir = this.value / 100;
    airFric.innerHTML = fAir;
    slider2.innerHTML = fAir;
}

slider3.oninput = function () {
    f = this.value / 100;
    fric.innerHTML = f;
    slider3.innerHTML = f;
}


cBall.addEventListener("click", () => {
    var circleA = Bodies.circle(200, 50, 25, {
        density: eval(dens), frictionAir: eval(fAir), friction: eval(f),
        render: {
            fillStyle: '#a83234',
        }
    });
    Composite.add(engine.world, [circleA]);
});

// Nazvy modulu
var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// Vyvolani enginu matter.js
var engine = Engine.create();
var world = engine.world;

const canvasHeight = 800
const canvasWidth = 1500

// Vytvoreni renderovaci funkce
var render = Render.create({
    element: document.getElementById("canvas"),
    engine: engine,
    options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
    }
});

// Objekty a jejich parametry

const wallWidth = 20

var circleA = Bodies.circle(200, 50, 25, {
    density: 0.01, frictionAir: 0.01, friction: 0.01,
    render: {
        fillStyle: '#a83234',
    }
});
var wallBotton = Bodies.rectangle(0, canvasHeight + wallWidth / 2, canvasWidth * 2, wallWidth, { isStatic: true, render });
var wallTop = Bodies.rectangle(0, -(wallWidth / 2), canvasWidth * 2, wallWidth, { isStatic: true });
var wallLeft = Bodies.rectangle(-(wallWidth / 2), 0, wallWidth, canvasHeight * 2, { isStatic: true });
var wallRight = Bodies.rectangle(canvasWidth + wallWidth / 2, 0, wallWidth, canvasHeight * 2, { isStatic: true });

Events.on(MouseConstraint, "mousemove", (ev) => {
    console.log("pohyb myši")
})

//velice velice slozte graf segment I guess
function linearGraphSegment(startingXCords, startingYCords, delta, segmentLength = 5) {
    const height = 10
    vertices = [
        { x: 0, y: 0 },
        { x: segmentLength, y: delta },
        { x: segmentLength, y: delta + height },
        { x: 0, y: height },
    ]
    return Bodies.fromVertices(startingXCords, startingYCords - (delta / 2), vertices, {
        isStatic: true, render: {
            fillStyle: '#107a34',
        }
    });
}

//velice velice slozity grafotvoric 2000F
function graphLinearByValues(x, y, values, segmentLength = 10) {
    const arr = []
    for (let i = 0; i < values.length; i++) {
        const delta = i === 0 ? 0 : values[i] - values[i - 1]
        arr.push(linearGraphSegment(i * segmentLength, values[i], delta, segmentLength))
    }
    return arr
}


const segmentLength = eval(segment)


// generace databodů dle zadané funkce
let dataPoints = []
// <7;7>
for (let x = -(canvasWidth / segmentLength); x <= (canvasWidth / segmentLength); x++) {
    let point = (
        -(

            // (2/x)

            eval(graph)

        )

        * canvasHeight / 4) + canvasHeight / 2


    dataPoints.push(point)
}

g = graphLinearByValues(50, 150, dataPoints, segmentLength)

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.5,
        render: {
            visible: false
        }
    }
});

World.add(world, mouseConstraint);

// Pridani objektu do sveta
Composite.add(engine.world, [circleA, ...g, wallBotton, wallTop, wallLeft, wallRight]);

render.mouse = mouse;

// Render
Render.run(render);

// Vytvoreni behu simulace
var runner = Runner.create();

// Beh enginu
Runner.run(runner, engine);