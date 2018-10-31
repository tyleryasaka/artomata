const precision = 100000

class Coord {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  print() {
    console.log(JSON.stringify(this))
  }
}

function square(n) {
  return Math.pow(n, 2)
}

function getPolygonDegrees(sides) {
  return ((sides - 2) * 180) / sides
}

function toRadians(degrees) {
  return Math.PI * (degrees / 180.0)
}

function toDegrees(radians) {
  return normalizeDegree((radians * 180.0) / Math.PI)
}

function sin(degrees) {
  return Math.sin(toRadians(degrees))
}

function cos(degrees) {
	return Math.cos(toRadians(degrees))
}

function getDegree(coord) {
  if (coord.x === 0) {
    return 0
  }
  return toDegrees(Math.atan2(coord.y, coord.x))
}

function normalizeDegree(degree) {
  return (degree + 360) % 360
}

function getMagnitude(coord) {
  return Math.sqrt(square(coord.x) + square(coord.y))
}

function rotate(coord, degrees) {
  const coordDegree = getDegree(coord)
  const newDegree = normalizeDegree(coordDegree + degrees)
  const magnitude = getMagnitude(coord)
  const newX = cos(newDegree) * magnitude
  const newY = sin(newDegree) * magnitude
  return new Coord(newX, newY)
}

function translate(coord, translation) {
  return new Coord(coord.x + translation.x, coord.y + translation.y)
}

function getTransform(rotationDegrees, translation) {
  return (coord) => {
    const rotated = rotate(coord, rotationDegrees)
    return translate(rotated, translation)
  }
}

function getPolygonPoints(sides) {
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

function normalizePoints(points, scale) {
  const pointsX = points.map(p => p.x)
  const pointsY = points.map(p => p.y)
  const minX = Math.min(...pointsX)
  const minY = Math.min(...pointsY)
  const maxX = Math.max(...pointsX)
  const maxY = Math.max(...pointsY)
  const translateX = -minX
  const translateY = -minY
  const scaleX = scale / (maxX + translateX)
  const scaleY = scale / (maxY + translateY)
  return points.map(point => {
    return new Coord(
      Math.round((point.x + translateX) * scaleX),
      Math.round((point.y + translateY) * scaleY)
    )
  })
}

function pointsToSVG(points, fill) {
  const pointsStr = points.reduce((acc, point) => {
    return `${acc} ${point.x},${point.y}`
  }, '').trim()
  return `<polygon points="${pointsStr}" fill="${fill}" />`
}

function makePolygon(sides) {
  const points = normalizePoints(getPolygonPoints(sides), 1000)
  return pointsToSVG(points, '#ED6E46')
}

console.log(makePolygon(7))
