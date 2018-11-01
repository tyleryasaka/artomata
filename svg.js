function pointsToSVG(points, fill, origin) {
  const pointsStr = points.reduce((acc, point) => {
    return `${acc} ${point.x},${point.y}`
  }, '').trim()
  return `<polygon points="${pointsStr}" fill="${fill}" />`
}

module.exports = {
  pointsToSVG
}
