/* globals PentaflowerSVG */

if (document.body) {
  document.body.onload = function () {
    const pentaflowerCanvas = new PentaflowerSVG({
      rings: 50,
      colors: [
        '#5383D6',
        '#212C3F',
        '#4D5E7C'
      ],
      containerId: 'pentaflower-canvas',
      startGeneration: 37
    })
  }
}
