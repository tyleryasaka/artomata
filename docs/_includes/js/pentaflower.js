const canvasConfigs = [{
  rings: 48,
  colors: [
    '#EF6F6C',
    '#465775',
    '#465775'
  ],
  startT: 990,
  name: 'Vivaciously Determined Scabiosa'
}, {
  rings: 100,
  colors: [
    '#DA4167',
    '#FFD166',
    '#FFD166'
  ],
  startT: 44,
  name: 'Unaccountably Yummy Scarlet Sage'
}, {
  rings: 46,
  colors: [
    '#FFD8DF',
    '#DB7F90',
    '#DB7F90'
  ],
  startT: 288,
  name: 'Quirkily Greasy Dusty Miller'
}, {
  rings: 98,
  colors: [
    '#ACC6F2',
    '#212C3F',
    '#4D5E7C'
  ],
  startT: 210,
  name: 'Loyally Icy Maiden Pink'
}, {
  rings: 33,
  colors: [
    '#9CE0C0',
    '#3D5A6C',
    '#3D5A6C'
  ],
  startT: 995,
  name: 'Lazily Ancient Geranium'
}, {
  rings: 72,
  colors: [
    '#D6D5C9',
    '#902923',
    '#902923'
  ],
  startT: 391,
  name: 'Sweetly Lovely Sanvitalia'
}, {
  rings: 67,
  colors: [
    '#F3CA40',
    '#577590',
    '#577590'
  ],
  startT: 31,
  name: 'Defiantly Exuberant Artemisia'
}, {
  rings: 40,
  colors: [
    '#CEE0DC',
    '#B48291',
    '#AFAAB9'
  ],
  startT: 201,
  name: 'Monthly Jealous Corydalis'
}, {
  rings: 78,
  colors: [
    '#CAFFB9',
    '#66A182',
    '#C0D461'
  ],
  startT: 108,
  name: 'Too Sweet Sweet Woodruff'
}, {
  rings: 30,
  colors: [
    '#FFB627',
    '#E2711D',
    '#FFB627'
  ],
  startT: 47,
  name: 'Kookily Resonant Fountain Grass'
}, {
  rings: 44,
  colors: [
    '#C2F8CB',
    '#8367C7',
    '#8367C7'
  ],
  startT: 108,
  name: 'Weakly Blue Bergenia'
}, {
  rings: 74,
  colors: [
    '#2D728F',
    '#A0EEE8',
    '#A0EEE8'
  ],
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
        const href = `/pentaflower/create?rings=${config.rings}&t=${config.startT}&color1=${encodeURIComponent(config.colors[0])}&color2=${encodeURIComponent(config.colors[1])}&color3=${encodeURIComponent(config.colors[2])}`
        imgEl.src = `/assets/img/${name.replace(/\s/g, '_')}.png`
        canvasEl.style.border = `5px solid ${config.colors[2]}`
        canvasEl.style.background = config.colors[2]
        linkEl.href = href
        const titleEl = document.createElement('a')
        titleEl.href = href
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
