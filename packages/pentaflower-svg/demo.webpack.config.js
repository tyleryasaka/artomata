const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [{
  mode: 'development',
  entry: './demo',
  output: {
    filename: 'demo.js',
    path: path.resolve(__dirname, 'dist/demo')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html'
    })
  ]
}]
