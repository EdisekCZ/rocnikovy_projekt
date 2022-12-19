// Nazvy modulu
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// Vyvolani enginu matter.js
var engine = Engine.create();

const canvasHeight = window.innerHeight - 2
const canvasWidth = 1500

// Vytvoreni renderovaci funkce
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: canvasWidth,
        height: canvasHeight
    }
});

// Objekty a jejich parametry

const wallWidth = 20

var circleA = Bodies.circle(200, 50, 25, {density: 0.1}, [300]);
var wallBotton = Bodies.rectangle(0, canvasHeight + wallWidth /2, canvasWidth * 2, wallWidth, {isStatic: true});
var wallTop = Bodies.rectangle(0, -(wallWidth /2), canvasWidth * 2, wallWidth, {isStatic: true});
var wallLeft = Bodies.rectangle(-(wallWidth /2), 0, wallWidth, canvasHeight * 2, {isStatic: true});
var wallRight = Bodies.rectangle(canvasWidth + wallWidth /2, 0, wallWidth, canvasHeight * 2, {isStatic: true});

//velice velice slozte graf segment I guess
function linearGraphSegment(startingXCords, startingYCords, delta, segmentLength = 5) {
    const height = 10
    vertices = [
        {x : 0 , y : 0},
        {x : segmentLength , y : delta},
        {x : segmentLength , y : delta + height},
        {x : 0, y : height},
    ]
    return Bodies.fromVertices(startingXCords, startingYCords - (delta /2), vertices, {isStatic: true});
}

//velice velice slozity grafotvoric 2000F
function graphLinearByValues(x, y, values, segmentLength = 10) {
    const arr = []
    for (let i = 0; i < values.length; i++) {
        const delta = i === 0 ? 0 : values[i] - values[i-1]
        arr.push(linearGraphSegment(i * segmentLength, values[i], delta, segmentLength))
    }
    return arr
}


const segmentLength = 10


// generace databodů dle zadané funkce
let dataPoints = []
// <7;7>
for (let x = -(canvasWidth / segmentLength); x <= (canvasWidth / segmentLength); x++) {
    let point = (
            -(
                
                // (2/x)

                Math.sin(x / 12)
                
                )
            
             * canvasHeight /4) + canvasHeight /2
    

    dataPoints.push(point)
}
console.log(dataPoints)


g = graphLinearByValues(50, 150, dataPoints, segmentLength)
console.log(g)



// Pridani objektu do sveta
Composite.add(engine.world, [circleA, ...g, wallBotton, wallTop, wallLeft, wallRight]);

// Render
Render.run(render);

// Vytvoreni behu simulace
var runner = Runner.create();

// Beh enginu
Runner.run(runner, engine);