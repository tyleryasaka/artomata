const path = require('path')

module.exports = [{
  mode: 'production',
  entry: './pentaflower-svg',
  output: {
    filename: 'pentaflower-svg.js',
    path: path.resolve(__dirname, '../../docs/_includes/js/dist')
  }
}]
