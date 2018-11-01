module.exports = class Coord {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  print() {
    console.log(JSON.stringify(this))
  }
}
