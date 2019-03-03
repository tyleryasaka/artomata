const { rings, aliveStates, colors, startCells, interval } = require('../settings')
const PentaflowerSVG = require('../pentaflower-svg')

const pentaflowerSVG = new PentaflowerSVG({ rings, aliveStates, colors, startCells, containerId: 'canvas' })
let play = false
let timer

function update () {
  pentaflowerSVG.nextGeneration()
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
    pentaflowerSVG.render()
  }
}
