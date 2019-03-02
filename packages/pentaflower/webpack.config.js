const path = require('path')

module.exports = [{
  mode: 'production',
  entry: './pentaflower',
  output: {
    filename: 'pentaflower.js',
    path: path.resolve(__dirname, 'dist')
  }
}]
