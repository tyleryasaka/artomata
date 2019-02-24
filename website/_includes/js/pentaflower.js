/* globals PentaflowerCanvas */

const canvasConfigs = [{
  rings: 50,
  aliveStates: [1],
  colors: [
    '#5383D6',
    '#212C3F',
    '#4D5E7C'
  ],
  startCells: [0],
  startT: 37
}, {
  rings: 50,
  aliveStates: [1],
  colors: [
    '#F79256',
    '#89441C',
    '#C94900'
  ],
  startCells: [0],
  startT: 10
}, {
  rings: 50,
  aliveStates: [1],
  colors: [
    '#FFFF00',
    '#6B6B37',
    '#99992A'
  ],
  startCells: [0],
  startT: 12
}, {
  rings: 50,
  aliveStates: [1],
  colors: [
    '#FFD8DF',
    '#604D51',
    '#DB7F90'
  ],
  startCells: [0],
  startT: 87
}]

const canvases = canvasConfigs.map((config, index) => {
  config.canvasId = `canvas-${index}`
  return new PentaflowerCanvas(config)
})

if (document.body) {
  document.body.onload = function () {
    canvases.forEach((canvas, index) => {
      canvas.renderCanvas()
      const name = canvas.getName()
      const canvasEl = document.getElementById(`canvas-${index}`)
      canvasEl.childNodes[1].style.border = `10px solid ${canvasConfigs[index].colors[2]}`
      const titleEl = document.createElement('div')
      titleEl.className = 'pentaflower-title'
      titleEl.innerHTML = name
      canvasEl.appendChild(titleEl)
    })
  }
}
