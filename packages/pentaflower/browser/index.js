const Pentaflower = require('../pentaflower')

const pentaflower = new Pentaflower()
let play = true

if (document.body) {
  document.body.onkeypress = function() {
    play = !play
  }
  document.body.onload = function() {
    pentaflower.setState(1)
    pentaflower.setState(3)
    pentaflower.setState(25)
    pentaflower.setState(84)
    pentaflower.setState(840)
    document.getElementById('canvas').innerHTML = pentaflower.render()
    setInterval(() => {
      if (play) {
        pentaflower.progress()
        document.getElementById('canvas').innerHTML = pentaflower.render()
      }
    }, 250)
  }
}
