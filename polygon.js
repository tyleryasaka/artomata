const Coord = require('./coord')
const {
  rotate,
  translate,
  sin,
  cos
} = require('./geometry')

function getPolygonDegrees(sides) {
  return ((sides - 2) * 180) / sides
}

function getTransform(rotationDegrees, translation) {
  return (coord) => {
    const rotated = rotate(coord, rotationDegrees)
    return translate(rotated, translation)
  }
}

function generateRegularPolygon(sides) {
  if (sides < 3) {
    throw new Error('Polygon must have 3 or more sides.')
  }

  let points = []
  points.push(new Coord(1, 0))
  points.push(new Coord(0, 0))

  const polygonDegrees = getPolygonDegrees(sides)
  const rotationDegrees = polygonDegrees + 180

  points.push(new Coord(cos(polygonDegrees), sin(polygonDegrees)))

  const translation = new Coord(points[2].x, points[2].y)
  const transform = getTransform(rotationDegrees, translation)

  const remainingPoints = sides - 3
  for(let i = 0; i < remainingPoints; i++) {
    points.push(transform(points[points.length - 1]))
  }

  return points
}

module.exports = {
  generateRegularPolygon
}
