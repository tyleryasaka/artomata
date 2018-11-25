const fs = require('fs')
const pentaflower = require('./pentaflower')

const canvas = pentaflower()

fs.writeFile('pentaflower.svg', canvas, () => {
  console.log('wrote to file pentaflower.svg')
})
