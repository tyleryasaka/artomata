const Pentaflower = require('../pentaflower')

const pentaflower = new Pentaflower()

if (document.body) {
  document.body.onkeypress = function() {
    // 
  }
  document.body.onload = function() {
    document.getElementById('canvas').innerHTML = pentaflower.render()
  }
}
