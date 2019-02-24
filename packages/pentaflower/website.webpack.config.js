const path = require('path')

module.exports = [{
  mode: 'production',
  entry: './pentaflower-canvas',
  output: {
    filename: 'pentaflower-canvas.js',
    path: path.resolve(__dirname, '../../website/_includes/js/dist')
  }
}]
