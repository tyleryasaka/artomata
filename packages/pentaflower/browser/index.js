const Pentaflower = require('../pentaflower')

const INTERVAL = 108

const pentaflower = new Pentaflower()
let play = false
let timer

if (document.body) {
  document.body.onkeypress = function() {
    if (play) {
      play = false
      clearInterval(timer)
    } else {
      play = true
      timer = setInterval(() => {
        if (play) {
          pentaflower.progress()
          document.getElementById('canvas').innerHTML = pentaflower.render()
        }
      }, INTERVAL)
    }
  }
  document.body.onload = function() {
    pentaflower.setState(1)
    pentaflower.setState(3)
    pentaflower.setState(25)
    pentaflower.setState(84)
    pentaflower.setState(840)
    document.getElementById('canvas').innerHTML = pentaflower.render()
  }
}
