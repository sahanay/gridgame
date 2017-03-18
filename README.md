GridGame v 1.0
====




Why another GridGame?
---------------------
Grids are all over the place. Why only use grids for layout when we can
use them to play a nice little fibonacci game?


Note:
The dist folder contains some basic setup for the css and html file.
In other cases, always include these classes in the following way:

```css
#gridgame {
}

#gridgame .black-text {
}

#gridgame td {

}

#gridgame td:hover {

}

#gridgame td.bright-yellow {

}

#gridgame td.green {

}

```
The application uses these classes to add effects to cells.

Usage
-----
1. Git clone the repo into your local folder (accessing dis/index.html already allows you to play the game)
2. run  ``` npm install ``` to install dev dependencies
3. Setup the config var in src/setupGame.js
4. run ```npm run dev``` in development so you watchify updates dist/bundle.js live (for a minified version, use ```npm run prod```).
2. Start dist/index.html
3. Play the game :)

Game Setup
---

In the index.html:
```html
<!-- Create an element -->
<div id="app"></app>
```

In the src/setupGame.js:
```js
// instantiate new GridGame
var game = new GridGame({
  rows: 50,
  columns: 50,
  el: 'app'
});

// initialize game
game.init();

```
