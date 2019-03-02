const Coord = require('./coord')

function square (n) {
  return Math.pow(n, 2)
}

function toRadians (degrees) {
  return Math.PI * (degrees / 180.0)
}

function toDegrees (radians) {
  return normalizeDegree((radians * 180.0) / Math.PI)
}

function sin (degrees) {
  return Math.sin(toRadians(degrees))
}

function cos (degrees) {
  return Math.cos(toRadians(degrees))
}

function getDegree (coord) {
  if (coord.x === 0) {
    return 0
  }
  return toDegrees(Math.atan2(coord.y, coord.x))
}

function normalizeDegree (degree) {
  return (degree + 360) % 360
}

function getMagnitude (coord) {
  return Math.sqrt(square(coord.x) + square(coord.y))
}

function rotate (coord, degrees) {
  const coordDegree = getDegree(coord)
  const newDegree = normalizeDegree(coordDegree + degrees)
  const magnitude = getMagnitude(coord)
  const newX = cos(newDegree) * magnitude
  const newY = sin(newDegree) * magnitude
  return new Coord(newX, newY)
}

function translate (coord, translation) {
  return new Coord(coord.x + translation.x, coord.y + translation.y)
}

module.exports = {
  rotate,
  translate,
  sin,
  cos
}
