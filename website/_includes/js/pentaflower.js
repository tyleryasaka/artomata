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
    '#FFFF01',
    '#6B6B37',
    '#99992A'
  ],
  startCells: [0],
  startT: 16
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
      const config = canvasConfigs[index]
      canvas.renderCanvas()
      const name = canvas.getName()
      const canvasEl = document.getElementById(`canvas-${index}`)
      canvasEl.childNodes[1].style.border = `5px solid ${config.colors[2]}`
      canvasEl.childNodes[1].onclick = function () {
        window.location.href = `/pentaflower/create?rings=${config.rings}&t=${config.startT}&color1=${encodeURIComponent(config.colors[0])}&color2=${encodeURIComponent(config.colors[1])}&color3=${encodeURIComponent(config.colors[2])}`
      }
      const titleEl = document.createElement('div')
      const titleTextEl = document.createElement('div')
      titleEl.className = 'pentaflower-title'
      titleTextEl.className = 'pentaflower-title-text'
      titleTextEl.innerHTML = name
      titleEl.style.background = config.colors[1]
      titleEl.style.color = config.colors[0]
      titleEl.style.border = `5px solid ${config.colors[2]}`
      titleEl.appendChild(titleTextEl)
      canvasEl.appendChild(titleEl)
    })
  }
}
