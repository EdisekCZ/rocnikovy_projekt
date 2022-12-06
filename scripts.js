const timeShift = 1 / 60
const canvasHeight = 400
const canvasWidth = 400

class Ball {
  constructor(x, y, properties, ctx) {
    this.pos = {
      x: x,
      y: y
    }
    this.vel = {
      x: 0,
      y: 0
    }
    this.size = 20;
    this.properties = properties
    this.ctx = ctx
  }

  draw() {
    const canvasRelativeYPos = canvasHeight - this.pos.y
    console.log("1")
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, canvasRelativeYPos, 50, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  move() {
    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    this.moveGravity()

    this.moveCheckBoundaries()

    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  moveGravity() {
    this.vel.y -= this.properties.g * timeShift
    this.vel.x -= this.properties.g * timeShift - 0.19
  }

  moveCheckBoundaries() {
    if (this.pos.y < 0) {
      this.pos.y = 0
      this.vel.y = (-this.vel.y) * this.properties.momentumPreservation
    }
  }
}

//Spouštění simulace
class Simulation {

  constructor() {
    let canvas = document.createElement("canvas")
    canvas.width  = 400;
    canvas.height = 400;
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    this.ctx = canvas.getContext("2d")

    this.balls = []
    this.timeStep = 0

    this.properties = {
      g: 9.81,
      momentumPreservation: 0.5
    }
  }
//Přidá kouly do canvasu
  addBall() {
    this.balls.push(new Ball(50, 350, this.properties, this.ctx))
  }

  move() {
    this.balls.forEach(ball => ball.move())
    this.balls.forEach(ball => ball.draw())
    this.balls.forEach(ball => document.getElementById("velocity").innerHTML = Math.sqrt(Math.pow(ball.vel.y, 2) + Math.pow(ball.vel.x, 2)).toFixed(1))
  }

  begin() {
    // if (this.timeStep > 8000) return
    // this.timeStep += 1
    // this.move()
    // window.requestAnimationFrame(this.begin);
  }

}

const simulation = new Simulation()
simulation.addBall()
let steps = 0

function xd() {
  if (steps > 6000) return
  steps += 1
  simulation.move()
  window.requestAnimationFrame(xd);
}
xd()
