const Coord = require('../../../lib/coord')
const { rings, aliveStates, colors, startCells, interval } = require('../settings')
const Pentaflower = require('../pentaflower')

const pentaflower = new Pentaflower({ rings, aliveStates })
let play = false
let timer
let prevFills, fills

const dimensions = pentaflower.getDimensions()
const fifthX = dimensions.rangeX / 5
const fifthY = dimensions.rangeY / 5
const offset = new Coord(dimensions.offset.x, dimensions.offset.y)
const viewXEnd = dimensions.rangeX - (2 * fifthX)
const viewYEnd = dimensions.rangeY - (2 * fifthY)
const points = pentaflower.pentagons.map(p => {
  return p.points.reduce((acc, point) => {
    return `${acc} ${point.x + offset.x},${point.y + offset.y}`
  }, '')
})

function canvas (fills) {
  return `\
    <div id="canvas">
      <svg xmlns="http://www.w3.org/2000/svg" width="700px" height="700px" viewBox="${fifthX} ${fifthY} ${viewXEnd} ${viewYEnd}" preserveAspectRatio="xMidYMid slice" style="background: ${colors[2]};">
        ${fills.map((fill, p) => {
          return `<polygon points="${points[p]}" fill="${fill}" id="poly-${p}" />`
        })}
      </svg>
    </div>
  `
}

function update () {
  pentaflower.progress()
  fills = pentaflower.pentagons.map(p => p.getState() ? colors[0] : colors[1])
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
    startCells.forEach(s => {
      pentaflower.setState(s)
    })
    prevFills = pentaflower.pentagons.map(p => p.getState() ? colors[0] : colors[1])
    document.body.innerHTML = canvas(prevFills)
  }
}
