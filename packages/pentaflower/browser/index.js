const Pentaflower = require('../pentaflower')

const pentaflower = new Pentaflower()

if (document.body) {
  document.body.onkeypress = function() {
    pentaflower.progress()
    document.getElementById('canvas').innerHTML = pentaflower.render()
  }
  document.body.onload = function() {
    pentaflower.setState(12)
    pentaflower.setState(123)
    pentaflower.setState(1234)
    document.getElementById('canvas').innerHTML = pentaflower.render()
  }
}
