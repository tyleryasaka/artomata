/* globals PentaflowerSVG */

const pentaflowerCanvas = new PentaflowerSVG({
  rings: 50,
  aliveStates: [1],
  colors: [
    '#5383D6',
    '#212C3F',
    '#4D5E7C'
  ],
  startCells: [0],
  canvasId: 'pentaflower-canvas',
  startT: 37
})

if (document.body) {
  document.body.onload = function () {
    pentaflowerCanvas.render()
  }
}
