# pentaflower

## Usage

#### Install

`npm install @artomata/pentaflower`

#### Usage in node

```js
const Pentaflower = require('@artomata/pentaflower')
const myFlower = new Pentaflower({ rings: 50 })
```

#### Usage in browser

```js
const Pentaflower = window.Pentaflower
const myFlower = new Pentaflower({ rings: 50 })
```

## Pentaflower API

### setState

```js
myFlower.setState(3) // sets the 4th pentagon state to true (i.e. alive)
```

### progress

```js
myFlower.progress() // moves pentaflower to the next state
```

### getDimensions

```js
myFlower.getDimensions() // returns useful info about dimensions of pentaflower
```

### pentagons

See Pentagon API below for more information about the returned objects.

```js
const pentagons = myFlower.pentagons // array of all of the pentagon objects
```

## Pentagon API

### points

```js
const points = myFlower.pentagons[0].points // array of point objects
const x = points[0].x
const y = points[0].y
```

### getState

```js
const state = myFlower.pentagons[0].getState() // boolean; true is alive
```
