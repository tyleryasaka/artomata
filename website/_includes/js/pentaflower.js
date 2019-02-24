/* globals PentaflowerCanvas */

const pentaflowerCanvas = new PentaflowerCanvas({
  rings: 50,
  aliveStates: [1],
  colors: [
    '#FFFF00',
    '#6B6B37',
    '#99992A'
  ],
  startCells: [0],
  canvasId: 'canvas-1',
  startT: 37
})

if (document.body) {
  document.body.onload = function () {
    pentaflowerCanvas.renderCanvas()
  }
}
