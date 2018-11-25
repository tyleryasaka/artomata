const { generateRegularPolygon } = require('../../lib/polygon')
const { pointsToSVG } = require('../../lib/svg')
const Coord = require('../../lib/coord')
const { rotate } = require('../../lib/geometry')
const {
  colors,
  rings
} = require('./settings')

function normalizeCanvas (polygons) {
  const minXByPoly = polygons.map(points => {
    return Math.min(...(points.map(p => p.x)))
  })
  const minYByPoly = polygons.map(points => {
    return Math.min(...(points.map(p => p.y)))
  })
  const maxXByPoly = polygons.map(points => {
    return Math.max(...(points.map(p => p.x)))
  })
  const maxYByPoly = polygons.map(points => {
    return Math.max(...(points.map(p => p.y)))
  })
  const minX = Math.min(...minXByPoly)
  const minY = Math.min(...minYByPoly)
  const maxX = Math.max(...maxXByPoly)
  const maxY = Math.max(...maxYByPoly)
  const rangeX = maxX - minX
  const rangeY = maxY - minY
  const range = Math.max(rangeX, rangeY)
  return {
    offset: new Coord(-minX, -minY),
    range
  }
}

function translatePoints (points, translation) {
  return points.map(point => {
    return new Coord(point.x + translation.x, point.y + translation.y)
  })
}

function rotatePoints (points, rotationDegrees) {
  return points.map(point => {
    return rotate(point, rotationDegrees)
  })
}

function makePolygon (sides, rotationDegrees, translation) {
  let points = generateRegularPolygon(sides)
  if (rotationDegrees) {
    points = rotatePoints(points, rotationDegrees)
  }
  if (translation) {
    points = translatePoints(points, translation)
  }
  return points
}

function difference (a, b) {
  return new Coord(a.x - b.x, a.y - b.y)
}

const neighborTransformations = {
  a: [1, 3],
  b: [0, 2],
  c: [4, 1],
  d: [2, 1],
  e: [1, 0],
  f: [2, 3],
  g: [1, 2],
  h: [0, 1],
  i: [3, 1],
  j: [2, 0]
}

const quadrantNeighbors = [
  {
    '1': { firstNeighbor: 'b', neighbor: 'a' },
    '2': { firstNeighbor: 'f', neighbor: 'g' }
  },
  {
    '1': { firstNeighbor: 'c', neighbor: 'b' },
    '2': { firstNeighbor: 'g', neighbor: 'h' }
  },
  {
    '1': { firstNeighbor: 'd', neighbor: 'c' },
    '2': { firstNeighbor: 'h', neighbor: 'i' }
  },
  {
    '1': { firstNeighbor: 'e', neighbor: 'd' },
    '2': { firstNeighbor: 'i', neighbor: 'j' }
  },
  {
    '1': { firstNeighbor: 'a', neighbor: 'e' },
    '2': { firstNeighbor: 'j', neighbor: 'f' }
  }
]

const template1 = makePolygon(5, null, new Coord(-0.5, -0.5))
const template2 = makePolygon(5, 36, new Coord(-0.5, -0.5))

class Pentagon {
  constructor (points, type, level, index) {
    this.points = points
    this.type = type
    this.level = level
    this.index = index
    this.quadrant = Math.ceil(index / level)
    this.subQuad = Math.ceil((2 * index) / level) % 10
    this.isFirst = (index % level) === 0
    this.isLast = (index % level) === (level - 1)
    const isEven = (this.subQuad % 2) === 0
    this.altType = ((type === '2') && isEven) || ((type === '1') && !isEven) ? 'a' : 'b'
    this.isLastInSub = (index % (level / 2)) === 0
    this.hasTwoNeighbors = (this.altType === 'b') || ((this.altType === 'a') && this.isLastInSub)
    this.neighbors = []
  }

  getColor () {
    // if (this.subQuad === 0) {
    //   return '#EE8434'
    // }
    // if (this.subQuad === 1) {
    //   return '#C36D2B'
    // }
    // if (this.subQuad === 2) {
    //   return '#C95D63'
    // }
    // if (this.subQuad === 3) {
    //   return '#A54D52'
    // }
    // if (this.subQuad === 4) {
    //   return '#AE8799'
    // }
    // if (this.subQuad === 5) {
    //   return '#8F6F7E'
    // }
    // if (this.subQuad === 6) {
    //   return '#717EC3'
    // }
    // if (this.subQuad === 7) {
    //   return '#5D68A0'
    // }
    // if (this.subQuad === 8) {
    //   return '#496DDB'
    // }
    // if (this.subQuad === 9) {
    //   return '#3C5AB4'
    // }
    // if (this.index % 5 === 2) {
    //   return '#C95D63'
    // }
    // if(this.isLastInSub) {
    //   return '#496DDB'
    // }
    const i = 39
    if (this.hasTwoNeighbors) {
      // return '#000'
    }
    if (this.index === i) {
      return '#9381FF'
    } else if (this.neighbors.filter(n => n.index === i).length) {
      return '#F8F7FF'
    }
    return colors[this.type]
  }

  addNeighbor (n) {
    const t = neighborTransformations[n]
    const template = this.type === '1' ? template2 : template1

    return translatePoints(template, difference(this.points[t[0]], template[t[1]]))
  }

  toSVG (offset) {
    return pointsToSVG(this.points, this.getColor(), new Coord(offset.x, offset.y))
  }
}

function pentaflower() {
  const poly1 = template1
  const poly2 = translatePoints(template2, difference(poly1[1], template2[0]))
  const poly3 = translatePoints(template2, difference(poly1[1], template2[3]))
  const poly4 = translatePoints(template2, difference(poly1[0], template2[2]))
  const poly5 = translatePoints(template2, difference(poly1[4], template2[1]))
  const poly6 = translatePoints(template2, difference(poly1[2], template2[1]))
  const pentagons = [
    new Pentagon(poly1, '1', 0, 0),
    new Pentagon(poly3, '2', 1, 0),
    new Pentagon(poly4, '2', 1, 1),
    new Pentagon(poly5, '2', 1, 2),
    new Pentagon(poly6, '2', 1, 3),
    new Pentagon(poly2, '2', 1, 4)
  ]

  function totalCountAtLevel (l) {
    if (l === 0) {
      return 1
    }
    return l * 5 + totalCountAtLevel(l - 1)
  }

  function flower (pentagons, maxLevel, level) {
    if (level < maxLevel) {
      const forLevelStart = totalCountAtLevel(level - 1)
      const forLevelEnd = totalCountAtLevel(level)
      const type = ((level % 2) === 0) ? '1' : '2'
      const nextType = (type === '1') ? '2' : '1'
      const iteration = []
      for (var p = forLevelStart; p < forLevelEnd; p++) {
        iteration.push(p)
      }
      let index = 0
      iteration.forEach((p, h) => {
        const quadrant = Math.floor(h / level)
        const isFirst = (h % level) === 0
        const isLast = (h % level) === (level - 1)
        if (type === '2' && isFirst) {
          const firstNeighbor = quadrantNeighbors[quadrant][type].firstNeighbor
          const firstPoints = pentagons[p].addNeighbor(firstNeighbor)
          const penta = new Pentagon(firstPoints, nextType, level + 1, index)
          penta.neighbors.push(pentagons[p])
          pentagons[p].neighbors.push(penta)
          pentagons.push(penta)
          index++
        }
        const neighbor = quadrantNeighbors[quadrant][type].neighbor
        const points = pentagons[p].addNeighbor(neighbor)
        const penta = new Pentagon(points, nextType, level + 1, index)
        penta.neighbors.push(pentagons[p])
        pentagons.push(penta)
        pentagons[p].neighbors.push(penta)
        const prev = pentagons[p - 1]
        const next = pentagons[p + 1]
        if (prev.hasTwoNeighbors && !prev.isLast && !prev.isFirst && prev.type === '1') {
          penta.neighbors.push(prev)
          prev.neighbors.push(penta)
        } else if (next.hasTwoNeighbors && !next.isLast && !next.isFirst && next.type === '2') {
          penta.neighbors.push(next)
          next.neighbors.push(penta)
        }
        index++
        if (type === '1' && isLast) {
          const firstNeighbor = quadrantNeighbors[quadrant][type].firstNeighbor
          const firstPoints = pentagons[p].addNeighbor(firstNeighbor)
          const penta = new Pentagon(firstPoints, nextType, level + 1, index)
          penta.neighbors.push(pentagons[p])
          pentagons[p].neighbors.push(penta)
          pentagons.push(penta)
          const next = pentagons[p + 1]
          if (next.hasTwoNeighbors) {
            penta.neighbors.push(next)
            next.neighbors.push(penta)
          }
          index++
        }
      })
      flower(pentagons, maxLevel, level + 1)
    }
  }

  flower(pentagons, rings, 1)

  const canvasConfig = normalizeCanvas(pentagons.map(p => p.points))

  const polySVG = pentagons.map(p => {
    return p.toSVG(new Coord(canvasConfig.offset.x, canvasConfig.offset.y))
  }).reduce((acc, svg) => {
    return `${acc}\n${svg}`
  })

  return `\
  <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
  <svg xmlns="http://www.w3.org/2000/svg" width="700px" height="700px" viewBox="0 0 ${canvasConfig.range} ${canvasConfig.range}" style="background:${colors.background}; margin: 50px;">
    ${polySVG}
  </svg>
  `
}

module.exports = pentaflower