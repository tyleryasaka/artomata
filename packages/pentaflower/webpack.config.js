const path = require('path')

module.exports = [{
  mode: 'production',
  entry: './pentaflower',
  output: {
    filename: 'pentaflower.js',
    path: path.resolve(__dirname, 'dist')
  }
}, {
  mode: 'production',
  entry: './pentaflower-canvas',
  output: {
    filename: 'pentaflower-canvas.js',
    path: path.resolve(__dirname, 'dist')
  }
}]
