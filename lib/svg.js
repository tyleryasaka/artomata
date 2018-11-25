function pointsToSVG (points, fill, origin) {
  const pointsStr = points.reduce((acc, point) => {
    return `${acc} ${point.x + origin.x},${point.y + origin.y}`
  }, '').trim()
  return `<polygon points="${pointsStr}" fill="${fill}" />`
}

module.exports = {
  pointsToSVG
}
