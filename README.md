# artomata

art + cellular automata

an experiment

[artomata.io](http://www.artomata.io)

## Examples

These are some examples of artwork generated with this code:

![Loyally Icy Maiden Pink](examples/Lazily_Ancient_Geranium.png)
![Quirkily Greasy Dusty Miller](examples/Quirkily_Greasy_Dusty_Miller.png)

![Too Sweet Sweet Woodruff](examples/Too_Sweet_Sweet_Woodruff.png)
![Unaccountably Yummy Scarlet Sage](examples/Unaccountably_Yummy_Scarlet_Sage.png)

## Development

All of the artomata code is open source and contained in this repo. There are several components.

### pentaflower

This is the javascript library that powers the pentaflower. I will clean this up and publish this to npm shortly, but for now you can get the source code as follows:

- `cd packages/pentaflower`
- `npm install`
- `npm run build`

The source code will be in `packages/pentaflower/dist`. There are 2 files: `pentaflower.js` (the bare-bones logic for the pentaflower) and `pentaflower-canvas.js` (a class that can render the pentaflower in a browser, export the file, etc).

TODO:
- publish to npm
- document API

### website

This is the source for the [artomata.io](http://www.artomata.io) website. It's a static site built with jekyll. The code is in the `docs` folder.
