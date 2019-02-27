/* globals PentaflowerCanvas */

const canvasConfigs = [{
  rings: 48,
  aliveStates: [1],
  colors: [
    '#EF6F6C',
    '#465775',
    '#465775'
  ],
  startCells: [0],
  startT: 990
}, {
  rings: 41,
  aliveStates: [1],
  colors: [
    '#F79256',
    '#89441C',
    '#C94900'
  ],
  startCells: [0],
  startT: 21
}, {
  rings: 30,
  aliveStates: [1],
  colors: [
    '#FFFF01',
    '#6B6B37',
    '#99992A'
  ],
  startCells: [0],
  startT: 16
}, {
  rings: 46,
  aliveStates: [1],
  colors: [
    '#FFD8DF',
    '#604D51',
    '#DB7F90'
  ],
  startCells: [0],
  startT: 288
}, {
  rings: 98,
  aliveStates: [1],
  colors: [
    '#ACC6F2',
    '#212C3F',
    '#4D5E7C'
  ],
  startCells: [0],
  startT: 210
}, {
  rings: 33,
  aliveStates: [1],
  colors: [
    '#72A98F',
    '#3D5A6C',
    '#3D5A6C'
  ],
  startCells: [0],
  startT: 995
}, {
  rings: 72,
  aliveStates: [1],
  colors: [
    '#D6D5C9',
    '#902923',
    '#902923'
  ],
  startCells: [0],
  startT: 391
}, {
  rings: 30,
  aliveStates: [1],
  colors: [
    '#FFB627',
    '#E2711D',
    '#FFB627'
  ],
  startCells: [0],
  startT: 47
}, {
  rings: 40,
  aliveStates: [1],
  colors: [
    '#CEE0DC',
    '#B48291',
    '#AFAAB9'
  ],
  startCells: [0],
  startT: 201
}, {
  rings: 78,
  aliveStates: [1],
  colors: [
    '#CAFFB9',
    '#66A182',
    '#C0D461'
  ],
  startCells: [0],
  startT: 108
}, {
  rings: 44,
  aliveStates: [1],
  colors: [
    '#C2F8CB',
    '#5603AD',
    '#8367C7'
  ],
  startCells: [0],
  startT: 108
}, {
  rings: 100,
  aliveStates: [1],
  colors: [
    '#DA4167',
    '#FFD166',
    '#FFD166'
  ],
  startCells: [0],
  startT: 44
}, {
  rings: 74,
  aliveStates: [1],
  colors: [
    '#2D728F',
    '#A0EEE8',
    '#A0EEE8'
  ],
  startCells: [0],
  startT: 36
}, {
  rings: 69,
  aliveStates: [1],
  colors: [
    '#F3CA40',
    '#577590',
    '#577590'
  ],
  startCells: [0],
  startT: 31
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
      const canvasContainerEl = document.getElementById(`canvas-${index}-container`)
      canvasEl.style.border = `5px solid ${config.colors[2]}`
      canvasEl.onclick = function () {
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
      canvasContainerEl.appendChild(titleEl)
    })
  }
}
