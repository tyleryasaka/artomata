const Coord = require('../../lib/coord')
const Pentaflower = require('./pentaflower')

class PentaflowerCanvas {
  constructor ({ rings, aliveStates, colors, startCells, startT = 0, canvasId }) {
    this.colors = colors
    this.pentaflower = new Pentaflower({ rings, aliveStates })
    startCells.forEach(s => {
      this.pentaflower.setState(s)
    })
    this.prevFills = null
    this.fills = this.pentaflower.pentagons.map(p => p.getState() ? this.colors[0] : this.colors[1])
    this.t = 0
    this.canvasId = canvasId
    this.hasRenderedCanvas = false

    const dimensions = this.pentaflower.getDimensions()
    this.fifthX = dimensions.rangeX / 5
    this.fifthY = dimensions.rangeY / 5
    const offset = new Coord(dimensions.offset.x, dimensions.offset.y)
    this.viewXEnd = dimensions.rangeX - (2 * this.fifthX)
    this.viewYEnd = dimensions.rangeY - (2 * this.fifthY)
    this.points = this.pentaflower.pentagons.map(p => {
      return p.points.reduce((acc, point) => {
        return `${acc} ${point.x + offset.x},${point.y + offset.y}`
      }, '')
    })
    this.prevFills = this.pentaflower.pentagons.map(p => p.getState() ? colors[0] : colors[1])
    for (let t = 0; t < startT; t++) {
      this.pentaflower.progress()
      this.t++
    }
  }

  nextT () {
    this.pentaflower.progress()
    this.t++
    this.renderCanvas()
  }

  renderInitialCanvas () {
    document.getElementById(this.canvasId).innerHTML = `\
      <svg xmlns="http://www.w3.org/2000/svg" width="700px" height="700px" viewBox="${this.fifthX} ${this.fifthY} ${this.viewXEnd} ${this.viewYEnd}" preserveAspectRatio="xMidYMid slice" style="background: ${this.colors[2]};">
        ${this.fills.map((fill, p) => {
          return `<polygon points="${this.points[p]}" fill="${fill}" id="${this.canvasId}-poly-${p}" />`
        })}
      </svg>
    `
  }

  renderCanvas () {
    if (!this.hasRenderedCanvas) {
      this.renderInitialCanvas()
      this.hasRenderedCanvas = true
    }
    this.fills = this.pentaflower.pentagons.map(p => p.getState() ? this.colors[0] : this.colors[1])
    const diffs = this.fills.map((fill, f) => {
      if (fill !== this.prevFills[f]) {
        return { index: f, fill }
      }
    })
    const updates = diffs.filter(d => !!d)
    updates.forEach(({ index, fill }) => {
      document.getElementById(`${this.canvasId}-poly-${index}`).setAttribute('fill', fill)
    })
    this.prevFills = this.fills
  }

  export (name = 'pentaflower') {
    const dummyElement = document.createElement('a')
    const file = new window.Blob([document.getElementById(this.canvasId).innerHTML], { type: 'text/plain' })
    dummyElement.href = URL.createObjectURL(file)
    dummyElement.download = `${name}.svg`
    dummyElement.click()
  }
}

module.exports = PentaflowerCanvas
global.PentaflowerCanvas = PentaflowerCanvas
