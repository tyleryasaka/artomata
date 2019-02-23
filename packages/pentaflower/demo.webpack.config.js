const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [{
  mode: 'development',
  entry: './browser',
  output: {
    filename: 'browser.js',
    path: path.resolve(__dirname, 'dist/demo')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'browser/index.html'
    })
  ]
}]
