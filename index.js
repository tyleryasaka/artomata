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

const offset = new Coord(2000, 2000)
const poly_1 = makePolygon(5, null, offset)
const rotated = makePolygon(5, 36, offset)

const poly_2 = translatePoints(rotated, difference(poly_1[1], rotated[0]))
const poly_3 = translatePoints(rotated, difference(poly_1[1], rotated[3]))
const poly_4 = translatePoints(rotated, difference(poly_1[0], rotated[2]))
const poly_5 = translatePoints(rotated, difference(poly_1[4], rotated[1]))
const poly_6 = translatePoints(rotated, difference(poly_1[2], rotated[1]))

const canvas = `\
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 4000 4000">
  ${pointsToSVG(poly_1, '#ED6E46')}
  ${pointsToSVG(poly_2, '#4286f4')}
  ${pointsToSVG(poly_3, '#4286f4')}
  ${pointsToSVG(poly_4, '#4286f4')}
  ${pointsToSVG(poly_5, '#4286f4')}
  ${pointsToSVG(poly_6, '#4286f4')}
</svg>
`

fs.writeFile('pentagon.svg', canvas, () => {
  console.log('done')
})
