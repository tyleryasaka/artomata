/* globals PentaflowerCanvas */

const canvasConfigs = [{
  rings: 48,
  aliveStates: [1],
  colors: [
    '#EF6F6C',
    '#465775',
    '#465775'
  ],
  startCells: [0],
  startT: 990,
  name: 'Vivaciously Determined Scabiosa'
}, {
  rings: 100,
  aliveStates: [1],
  colors: [
    '#DA4167',
    '#FFD166',
    '#FFD166'
  ],
  startCells: [0],
  startT: 44,
  name: 'Unaccountably Yummy Scarlet Sage'
}, {
  rings: 46,
  aliveStates: [1],
  colors: [
    '#FFD8DF',
    '#DB7F90',
    '#DB7F90'
  ],
  startCells: [0],
  startT: 288,
  name: 'Quirkily Greasy Dusty Miller'
}, {
  rings: 98,
  aliveStates: [1],
  colors: [
    '#ACC6F2',
    '#212C3F',
    '#4D5E7C'
  ],
  startCells: [0],
  startT: 210,
  name: 'Loyally Icy Maiden Pink'
}, {
  rings: 33,
  aliveStates: [1],
  colors: [
    '#9CE0C0',
    '#3D5A6C',
    '#3D5A6C'
  ],
  startCells: [0],
  startT: 995,
  name: 'Lazily Ancient Geranium'
}, {
  rings: 72,
  aliveStates: [1],
  colors: [
    '#D6D5C9',
    '#902923',
    '#902923'
  ],
  startCells: [0],
  startT: 391,
  name: 'Sweetly Lovely Sanvitalia'
}, {
  rings: 67,
  aliveStates: [1],
  colors: [
    '#F3CA40',
    '#577590',
    '#577590'
  ],
  startCells: [0],
  startT: 31,
  name: 'Defiantly Exuberant Artemisia'
}, {
  rings: 40,
  aliveStates: [1],
  colors: [
    '#CEE0DC',
    '#B48291',
    '#AFAAB9'
  ],
  startCells: [0],
  startT: 201,
  name: 'Monthly Jealous Corydalis'
}, {
  rings: 78,
  aliveStates: [1],
  colors: [
    '#CAFFB9',
    '#66A182',
    '#C0D461'
  ],
  startCells: [0],
  startT: 108,
  name: 'Too Sweet Sweet Woodruff'
}, {
  rings: 30,
  aliveStates: [1],
  colors: [
    '#FFB627',
    '#E2711D',
    '#FFB627'
  ],
  startCells: [0],
  startT: 47,
  name: 'Kookily Resonant Fountain Grass'
}, {
  rings: 44,
  aliveStates: [1],
  colors: [
    '#C2F8CB',
    '#8367C7',
    '#8367C7'
  ],
  startCells: [0],
  startT: 108,
  name: 'Weakly Blue Bergenia'
}, {
  rings: 74,
  aliveStates: [1],
  colors: [
    '#2D728F',
    '#A0EEE8',
    '#A0EEE8'
  ],
  startCells: [0],
  startT: 36,
  name: 'Bravely Cool Moonflower'
}]

if (document.body) {
  document.body.onload = function () {
    setTimeout(() => {
      canvasConfigs.forEach((config, index) => {
        const name = config.name
        const canvasEl = document.getElementById(`canvas-${index}`)
        const imgEl = canvasEl.getElementsByTagName('img')[0]
        const canvasContainerEl = document.getElementById(`canvas-${index}-container`)
        const linkEl = canvasContainerEl.getElementsByTagName('a')[0]
        imgEl.src = `/assets/img/${name.replace(/\s/g, '_')}.png`
        canvasEl.style.border = `5px solid ${config.colors[2]}`
        canvasEl.style.background = config.colors[2]
        linkEl.href = `/pentaflower/create?rings=${config.rings}&t=${config.startT}&color1=${encodeURIComponent(config.colors[0])}&color2=${encodeURIComponent(config.colors[1])}&color3=${encodeURIComponent(config.colors[2])}`
        const titleEl = document.createElement('div')
        const titleTextEl = document.createElement('div')
        titleEl.className = 'pentaflower-title'
        titleTextEl.className = 'pentaflower-title-text'
        titleTextEl.innerHTML = name
        titleEl.style.background = config.colors[1]
        titleEl.style.color = config.colors[0]
        titleEl.style.border = `5px solid ${config.colors[2]}`
        titleEl.appendChild(titleTextEl)
        canvasContainerEl.appendChild(titleEl)
      })
    }, 0)
  }
}
