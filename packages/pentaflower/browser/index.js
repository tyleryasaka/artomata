const Pentaflower = require('../pentaflower')

const pentaflower = new Pentaflower()
let play = true

if (document.body) {
  document.body.onkeypress = function() {
    play = !play
  }
  document.body.onload = function() {
    pentaflower.setState(0)
    document.getElementById('canvas').innerHTML = pentaflower.render()
    setInterval(() => {
      if (play) {
        pentaflower.progress()
        document.getElementById('canvas').innerHTML = pentaflower.render()
      }
    }, 1000)
  }
}
