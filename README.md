GridGame v 0.5
(not stable)
====




Why another GridGame?
---------------------
Grids are all over the place. Why only use grids for layout when we can
use them to play a nice little fibinacci game?

Usage
-----
1. Git clone the repo into your local folder
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

// => Have fun

```
