const pentaflower = require('../pentaflower')

const canvas = pentaflower()

if (document.body) {
  document.body.onload = function() {
    document.getElementById('canvas').innerHTML = canvas
  }
}
