const Coord = require('@artomata/lib/coord')
const Pentaflower = require('@artomata/pentaflower')
const adverbs = require('./words/adverbs.json')
const adjectives = require('./words/adjectives.json')
const flowers = require('./words/flowers.json')

// credit: https://stackoverflow.com/a/8831937
function getHash (str) {
  var hash = 0
  if (str.length === 0) {
    return hash
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

// credit: https://stackoverflow.com/a/12300351
function dataURItoBlob (dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = window.atob(dataURI.split(',')[1])

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  var ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new window.Blob([ab], { type: mimeString })
  return blob
}

class PentaflowerSVG {
  constructor ({ rings, aliveStates = [1], colors, startCells = [0], startT = 0, containerId }) {
    this.rings = rings
    this.aliveStates = aliveStates
    this.colors = colors.map(c => c.toUpperCase())
    this.startCells = startCells
    this.pentaflower = new Pentaflower({ rings, aliveStates })
    startCells.forEach(s => {
      this.pentaflower.setState(s)
    })
    this.prevFills = null
    this.fills = this.pentaflower.pentagons.map(p => p.getState() ? this.colors[0] : this.colors[1])
    this.t = 0
    this.containerId = containerId
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
    this.render()
  }

  nextT () {
    this.pentaflower.progress()
    this.t++
    this.render()
  }

  renderInitial () {
    document.getElementById(this.containerId).innerHTML = `\
      <svg xmlns="http://www.w3.org/2000/svg" width="5000px" height="5000px" viewBox="${this.fifthX} ${this.fifthY} ${this.viewXEnd} ${this.viewYEnd}" preserveAspectRatio="xMidYMid slice">
        <rect width="100%" height="100%" x="${this.fifthX}" y="${this.fifthY}" fill="${this.colors[2]}"/>
        ${this.fills.map((fill, p) => {
          return `<polygon points="${this.points[p]}" fill="${fill}" id="${this.containerId}-poly-${p}" />`
        })}
      </svg>
    `
  }

  render () {
    if (!this.hasRenderedCanvas) {
      this.renderInitial()
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
      document.getElementById(`${this.containerId}-poly-${index}`).setAttribute('fill', fill)
    })
    this.prevFills = this.fills
  }

  export (name, size = 5000) {
    name = name || this.getName().replace(/\s/g, '_')
    // https://stackoverflow.com/a/5438011
    const svgElement = document.getElementById(this.containerId).getElementsByTagName('svg')[0]
    const canvasElement = document.createElement('canvas')
    const context = canvasElement.getContext('2d')
    const loader = new window.Image()
    loader.width = canvasElement.width = size
    loader.height = canvasElement.height = size
    loader.onload = function () {
      context.drawImage(loader, 0, 0, size, size)
      const dummyElement = document.createElement('a')
      const file = dataURItoBlob(canvasElement.toDataURL())
      dummyElement.href = URL.createObjectURL(file)
      dummyElement.download = `${name}.png`
      dummyElement.click()
    }
    const svgAsXML = (new window.XMLSerializer()).serializeToString(svgElement)
    loader.src = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML)
  }

  getName () {
    const adverbSeed = {
      colors: this.colors,
      rings: this.rings,
      aliveStates: this.aliveStates,
      startCells: this.startCells,
      t: this.t
    }
    const adjectiveSeed = this.colors
    const flowerSeed = {
      rings: this.rings,
      aliveStates: this.aliveStates,
      startCells: this.startCells,
      t: this.t
    }
    const adverbSeedStr = JSON.stringify(adverbSeed)
    const adjectiveSeedStr = JSON.stringify(adjectiveSeed)
    const flowerSeedStr = JSON.stringify(flowerSeed)
    const adverbHash = getHash(adverbSeedStr)
    const adjectiveHash = getHash(adjectiveSeedStr)
    const flowerHash = getHash(flowerSeedStr)
    const adverbIndex = Math.abs(adverbHash) % adverbs.length
    const adjectiveIndex = Math.abs(adjectiveHash) % adjectives.length
    const flowerIndex = Math.abs(flowerHash) % flowers.length
    const adverb = adverbs[adverbIndex]
    const adjective = adjectives[adjectiveIndex]
    const flower = flowers[flowerIndex]
    return `${adverb} ${adjective} ${flower}`
  }
}

module.exports = PentaflowerSVG
global.PentaflowerSVG = PentaflowerSVG
