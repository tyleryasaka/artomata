/* globals PentaflowerCanvas */

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
    if (newValue >= 0 && newValue <= 500) {
      canvasConfig.startT = newValue
    }
  } else if (controlId === 'control-color-1') {
    if (isValidColor(newValue)) {
      canvasConfig.colors[0] = newValue
    }
  } else if (controlId === 'control-color-2') {
    if (isValidColor(newValue)) {
      canvasConfig.colors[1] = newValue
    }
  } else if (controlId === 'control-color-3') {
    if (isValidColor(newValue)) {
      canvasConfig.colors[2] = newValue
    }
  }
  renderCanvas(canvasConfig)
}

function downloadSVG () {
  canvas.export(canvas.getName().replace(/\s/g, '_'))
}

document.getElementById('control-rings').onchange = onChangeControl
document.getElementById('control-t').onchange = onChangeControl
document.getElementById('control-color-1').onchange = onChangeControl
document.getElementById('control-color-2').onchange = onChangeControl
document.getElementById('control-color-3').onchange = onChangeControl
document.getElementById('download').onclick = downloadSVG

function updateControls (config) {
  document.getElementById('control-rings').value = config.rings
  document.getElementById('control-t').value = config.startT
  document.getElementById('control-color-1').value = config.colors[0]
  document.getElementById('control-color-2').value = config.colors[1]
  document.getElementById('control-color-3').value = config.colors[2]
  urlParams.set('rings', config.rings)
  urlParams.set('t', config.startT)
  urlParams.set('color1', config.colors[0])
  urlParams.set('color2', config.colors[1])
  urlParams.set('color3', config.colors[2])
  document.getElementById('share-link').value = `${window.location.href.split('?')[0]}?${urlParams.toString()}`
}

function renderCanvas (config) {
  updateControls(config)
  canvas = new PentaflowerCanvas(config)
  canvas.renderCanvas()
  const name = canvas.getName()
  const canvasEl = document.getElementById(config.canvasId)
  canvasEl.childNodes[1].style.border = `5px solid ${config.colors[2]}`
  const titleEl = document.createElement('div')
  const titleTextEl = document.createElement('div')
  titleEl.className = 'pentaflower-title create'
  titleTextEl.className = 'pentaflower-title-text'
  titleTextEl.innerHTML = name
  titleEl.style.background = config.colors[1]
  titleEl.style.color = config.colors[0]
  titleEl.style.border = `5px solid ${config.colors[2]}`
  titleEl.appendChild(titleTextEl)
  canvasEl.appendChild(titleEl)
}

if (document.body) {
  document.body.onload = function () {
    renderCanvas(canvasConfig)
  }
}
