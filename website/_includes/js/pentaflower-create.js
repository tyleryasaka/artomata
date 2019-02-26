/* globals PentaflowerCanvas, Pickr */

const pickerComponentConfig = {
  // Main components
  preview: true,
  hue: true,

  // Input / output Options
  interaction: {
    save: true,
    hex: true,
    input: true
  }
}

const urlParams = new URLSearchParams(window.location.search)
const canvasConfig = {
  rings: Number(urlParams.get('rings')),
  aliveStates: [1],
  colors: [
    urlParams.get('color1'),
    urlParams.get('color2'),
    urlParams.get('color3')
  ],
  startCells: [0],
  startT: Number(urlParams.get('t')),
  canvasId: 'canvas-create'
}
let canvas

function isValidColor (hex) {
  return /^#(?:[0-9a-f]{3}){1,2}$/i.test(hex)
}

function onChangeControl (ev) {
  let newValue = ev.target.value
  const controlId = ev.target.id
  if (controlId === 'control-rings') {
    newValue = Number(newValue)
    if (newValue >= 5 && newValue <= 100) {
      canvasConfig.rings = newValue
    }
  } else if (controlId === 'control-t') {
    newValue = Number(newValue)
    if (newValue >= 0 && newValue <= 1000) {
      canvasConfig.startT = newValue
    }
  }
  renderCanvas(canvasConfig)
}

function downloadSVG () {
  canvas.export(canvas.getName().replace(/\s/g, '_'))
}

document.getElementById('control-rings').onchange = onChangeControl
document.getElementById('control-t').onchange = onChangeControl
document.getElementById('download').onclick = downloadSVG

const pickr1 = Pickr.create({
  el: '#control-color-1',
  default: canvasConfig.colors[0],
  components: pickerComponentConfig
})

const pickr2 = Pickr.create({
  el: '#control-color-2',
  default: canvasConfig.colors[1],
  components: pickerComponentConfig
})

const pickr3 = Pickr.create({
  el: '#control-color-3',
  default: canvasConfig.colors[2],
  components: pickerComponentConfig
})

function onSavePicker (args, colorIndex) {
  const newValue = args[0].toHEX().toString()
  if (isValidColor(newValue)) {
    canvasConfig.colors[colorIndex] = newValue
  }
  renderCanvas(canvasConfig)
}

pickr1.on('save', (...args) => onSavePicker(args, 0))
pickr2.on('save', (...args) => onSavePicker(args, 1))
pickr3.on('save', (...args) => onSavePicker(args, 2))

function updateControls (config) {
  document.getElementById('control-rings').value = config.rings
  document.getElementById('control-t').value = config.startT
  urlParams.set('rings', config.rings)
  urlParams.set('t', config.startT)
  urlParams.set('color1', config.colors[0])
  urlParams.set('color2', config.colors[1])
  urlParams.set('color3', config.colors[2])
  document.getElementById('share-link').value = `${window.location.href.split('?')[0]}?${urlParams.toString()}`
}

function renderCanvas (config) {
  let titleEl = document.getElementById('canvas-title')
  let titleTextEl = document.getElementById('canvas-title-text')
  const created = Boolean(titleEl)
  if (!created) {
    titleEl = document.createElement('div')
    titleTextEl = document.createElement('div')
    titleEl.id = 'canvas-title'
    titleTextEl.id = 'canvas-title-text'
  }

  updateControls(config)
  canvas = new PentaflowerCanvas(config)
  canvas.renderCanvas()
  const name = canvas.getName()
  const canvasEl = document.getElementById(config.canvasId)
  canvasEl.style.border = `5px solid ${config.colors[2]}`
  titleEl.className = 'pentaflower-title create'
  titleTextEl.className = 'pentaflower-title-text'
  titleTextEl.innerHTML = name
  titleEl.style.background = config.colors[1]
  titleEl.style.color = config.colors[0]
  titleEl.style.border = `5px solid ${config.colors[2]}`

  if (!created) {
    const canvasContainerEl = document.getElementById(`canvas-create-container`)
    titleEl.appendChild(titleTextEl)
    canvasContainerEl.appendChild(titleEl)
  }
}

if (document.body) {
  document.body.onload = function () {
    renderCanvas(canvasConfig)
  }
}
