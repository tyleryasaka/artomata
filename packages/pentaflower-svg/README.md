# pentaflower-svg

## Usage

#### Install

`npm install @artomata/pentaflower-svg`

#### Usage in browser

```js
const PentaflowerSVG = window.PentaflowerSVG
const myFlower = new PentaflowerSVG({
  rings: 50,
  startGeneration: 37, // start at a specific generation
  colors: [
    '#5383D6',
    '#212C3F',
    '#4D5E7C'
  ],
  containerId: 'container-element-id'
})
```

This generates an svg element within the element specified by the `containerId` property of the config object.

## Pentaflower API

### nextGeneration

Progresses the pentaflower to the next generation. This automatically re-renders the svg.

```js
myFlower.nextGeneration()
```

### export

Converts the svg to a png and triggers a download of this file. Can optionally pass in name and size.

```js
myFlower.export() // defaults name to the pentaflower name (see getName) and size to 5000

// or
const name = 'my-file-name'
const size = 500 // will result in a 500x500 image
myFlower.export(name, size)
```

### getName

Returns the automatically generated name for the pentaflower in its current state.

```js
const myFunkyName = myFlower.getName() // e.g. "Unaccountably Yummy Scarlet Sage"
```
