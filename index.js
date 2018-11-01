const fs = require('fs')
const { generateRegularPolygon } = require('./polygon')
const { pointsToSVG } = require('./svg')
const Coord = require('./coord')
const { rotate } = require('./geometry')

function normalizePoints(points, viewbox) {
  const pointsX = points.map(p => p.x)
  const pointsY = points.map(p => p.y)
  const minX = Math.min(...pointsX)
  const minY = Math.min(...pointsY)
  const maxX = Math.max(...pointsX)
  const maxY = Math.max(...pointsY)
  const translateX = -minX
  const translateY = -minY
  const scaleX = viewbox / (maxX + translateX)
  const scaleY = viewbox / (maxY + translateY)
  const scale = Math.min(scaleX, scaleY)
  return points.map(point => {
    return new Coord(
      Math.round((point.x + translateX) * scale),
      Math.round((point.y + translateY) * scale)
    )
  })
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
  points = normalizePoints(points, 1000)
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

const fills = {
  '1': '#ED6E46',
  '2': '#4286f4'
}

const offset = new Coord(7000, 7000)

const template_1 = makePolygon(5, null, offset)
const template_2 = makePolygon(5, 36, offset)

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

  toSVG() {
    return pointsToSVG(this.points, fills[this.type])
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
  if (level <= maxLevel) {
    const forLevelStart = totalCountAtLevel(level - 1)
    console.log('start', forLevelStart)
    const forLevelEnd = totalCountAtLevel(level)
    for(var i = forLevelStart; i < forLevelEnd; i++) {
      const quadrant = Math.floor((i - forLevelStart) / level)
      const isFirst = (i % level) === 0
      const type = ((level % 2) === 0) ? '1' : '2'
      const nextType = (type === '1') ? '2' : '1'
      if (isFirst) {
        const firstNeighbor = quadrantNeighbors[quadrant][type].firstNeighbor
        const firstPoints = pentagons[i].addNeighbor(firstNeighbor)
        pentagons.push(new Pentagon(firstPoints, nextType))
      }
      const neighbor = quadrantNeighbors[quadrant][type].neighbor
      const points = pentagons[i].addNeighbor(neighbor)
      pentagons.push(new Pentagon(points, nextType))
    }
    flower(pentagons, maxLevel, level + 1)
  }
}

flower(pentagons, 10, 1)

const polySVG = pentagons.map(p => {
  return p.toSVG()
}).reduce((acc, svg) => {
  return `${acc}\n${svg}`
})

const canvas = `\
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="1000px" height="1000px" viewBox="0 0 20000 20000">
  ${polySVG}
</svg>
`

fs.writeFile('pentagon.svg', canvas, () => {
  console.log('done')
})
