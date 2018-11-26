const Coord = require('../../../lib/coord')
const { colors } = require('../settings')
const Pentaflower = require('../pentaflower')

const INTERVAL = 250

const pentaflower = new Pentaflower()
let play = false
let timer
let el
let prevFills, fills

const canvasConfig = pentaflower.normalizeCanvas()
const fifthX = canvasConfig.rangeX / 5
const fifthY = canvasConfig.rangeY / 5
const offset = new Coord(canvasConfig.offset.x, canvasConfig.offset.y)
const viewXEnd = canvasConfig.rangeX - (2 * fifthX)
const viewYEnd = canvasConfig.rangeY - (2 * fifthY)
const points = pentaflower.pentagons.map(p => {
  return p.points.reduce((acc, point) => {
    return `${acc} ${point.x + offset.x},${point.y + offset.y}`
  }, '')
})

function canvas(fills) {
  return `\
    <div id="canvas">
      <svg xmlns="http://www.w3.org/2000/svg" width="700px" height="700px" viewBox="${fifthX} ${fifthY} ${viewXEnd} ${viewYEnd}" preserveAspectRatio="xMidYMid slice" style="background: ${colors.background};">
        ${fills.map((fill, p) => {
          return `<polygon points="${points[p]}" fill="${fill}" id="poly-${p}" />`
        })}
      </svg>
    </div>
  `
}

function update() {
  pentaflower.progress()
  fills = pentaflower.pentagons.map(p => p.getColor())
  const diffs = fills.map((fill, f) => {
    if (fill !== prevFills[f]) {
      return { index: f, fill }
    }
  })
  const updates = diffs.filter(d => !!d)
  updates.forEach(({ index, fill }) => {
    document.getElementById(`poly-${index}`).setAttribute('fill', fill)
  })
  prevFills = fills
}

if (document.body) {
  document.body.onkeypress = function() {
    update()
    if (play) {
      play = false
      clearInterval(timer)
    } else {
      play = true
      timer = setInterval(() => {
        update()
      }, INTERVAL)
    }
  }
  document.body.onload = function() {
    pentaflower.setState(1)
    pentaflower.setState(3)
    pentaflower.setState(25)
    pentaflower.setState(84)
    pentaflower.setState(840)
    prevFills = pentaflower.pentagons.map(p => p.getColor())
    document.body.innerHTML = canvas(prevFills)
  }
}
