const fs = require('fs')
const { generateRegularPolygon } = require('./polygon')
const { pointsToSVG } = require('./svg')
const Coord = require('./coord')
const { rotate } = require('./geometry')
const {
  colors,
  rings
} = require('./settings')

function normalizeCanvas(polygons) {
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
  const translateX = minX
  const translateY = minY
  const rangeX = maxX - minX
  const rangeY = maxY - minY
  const range = Math.max(rangeX, rangeY)
  return {
    offset: {
      x: -minX,
      y: -minY
    },
    range
  }
}

function translatePoints(points, translation) {
  return points.map(point => {
    return new Coord(point.x + translation.x, point.y + translation.y)
  })
}

function rotatePoints(points, rotationDegrees) {
  return points.map(point => {
    return rotate(point, rotationDegrees)
  })
}

function makePolygon(sides, rotationDegrees, translation) {
  let points = generateRegularPolygon(sides)
  if (rotationDegrees) {
    points = rotatePoints(points, rotationDegrees)
  }
  if (translation) {
    points = translatePoints(points, translation)
  }
  return points
}

function difference(a, b) {
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
    '1': { firstNeighbor: 'e', neighbor: 'a' },
    '2': { firstNeighbor: 'f', neighbor: 'g' }
  },
  {
    '1': { firstNeighbor: 'a', neighbor: 'b' },
    '2': { firstNeighbor: 'g', neighbor: 'h' }
  },
  {
    '1': { firstNeighbor: 'b', neighbor: 'c' },
    '2': { firstNeighbor: 'h', neighbor: 'i' }
  },
  {
    '1': { firstNeighbor: 'c', neighbor: 'd' },
    '2': { firstNeighbor: 'i', neighbor: 'j' }
  },
  {
    '1': { firstNeighbor: 'd', neighbor: 'e' },
    '2': { firstNeighbor: 'j', neighbor: 'f' }
  }
]

const template_1 = makePolygon(5, null, new Coord(-0.5, -0.5))
const template_2 = makePolygon(5, 36, new Coord(-0.5, -0.5))

class Pentagon {
  constructor(points, type) {
    this.points = points
    this.type = type
  }

  addNeighbor(n) {
    const t = neighborTransformations[n]
    const template = this.type === '1' ? template_2 : template_1

    return translatePoints(template, difference(this.points[t[0]], template[t[1]]))
  }

  toSVG(offset) {
    return pointsToSVG(this.points, colors[this.type], new Coord(offset.x, offset.y))
  }
}

const poly_1 = template_1
const poly_2 = translatePoints(template_2, difference(poly_1[1], template_2[0]))
const poly_3 = translatePoints(template_2, difference(poly_1[1], template_2[3]))
const poly_4 = translatePoints(template_2, difference(poly_1[0], template_2[2]))
const poly_5 = translatePoints(template_2, difference(poly_1[4], template_2[1]))
const poly_6 = translatePoints(template_2, difference(poly_1[2], template_2[1]))
const pentagons = [
  new Pentagon(poly_1, '1'),
  new Pentagon(poly_2, '2'),
  new Pentagon(poly_3, '2'),
  new Pentagon(poly_4, '2'),
  new Pentagon(poly_5, '2'),
  new Pentagon(poly_6, '2')
]

function totalCountAtLevel(l) {
  if (l === 0) {
    return 1
  }
  return l * 5 + totalCountAtLevel(l - 1)
}

function flower(pentagons, maxLevel, level) {
  if (level < maxLevel) {
    const forLevelStart = totalCountAtLevel(level - 1)
    const forLevelEnd = totalCountAtLevel(level)
    const type = ((level % 2) === 0) ? '1' : '2'
    const nextType = (type === '1') ? '2' : '1'
    const iteration = []
    if (type === '2') {
      for(var p = forLevelStart + 1; p < forLevelEnd; p++) {
        iteration.push(p)
      }
      iteration.push(forLevelStart)
    } else {
      for(var p = forLevelStart; p < forLevelEnd; p++) {
        iteration.push(p)
      }
    }
    iteration.forEach((p, h) => {
      i = h + forLevelStart
      const quadrant = Math.floor((i - forLevelStart) / level)
      const isFirst = (h % level) === 0
      if (isFirst) {
        const firstNeighbor = quadrantNeighbors[quadrant][type].firstNeighbor
        const firstPoints = pentagons[p].addNeighbor(firstNeighbor)
        pentagons.push(new Pentagon(firstPoints, nextType))
      }
      const neighbor = quadrantNeighbors[quadrant][type].neighbor
      const points = pentagons[p].addNeighbor(neighbor)
      pentagons.push(new Pentagon(points, nextType))
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

const canvas = `\
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 ${canvasConfig.range} ${canvasConfig.range}" style="background:${colors.background}">
  ${polySVG}
</svg>
`

fs.writeFile('pentagon.svg', canvas, () => {
  console.log('done')
})
