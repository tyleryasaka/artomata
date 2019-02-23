const { rings, aliveStates, colors, startCells, interval } = require('../settings')
const PentaflowerCanvas = require('../pentaflower-canvas')

const pentaflowerCanvas = new PentaflowerCanvas({ rings, aliveStates, colors, startCells, canvasId: 'canvas' })
let play = false
let timer

function update () {
  pentaflowerCanvas.nextT()
}

if (document.body) {
  document.body.onkeypress = function () {
    // update()
    if (play) {
      play = false
      clearInterval(timer)
    } else {
      play = true
      timer = setInterval(() => {
        update()
      }, interval)
    }
  }
  document.body.onload = function () {
    pentaflowerCanvas.renderCanvas()
  }
}
