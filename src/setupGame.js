/**
  * Game initialisation
  */

var GridGame = require('./index');

/**
  * Setup configuration for the game
  */

var config = {
  rows:    50,
  columns: 50,
  el:      'app'
}

/**
  * Use configuration to setup the game
  */
var gridGame = new GridGame(config);


/**
  * Initialize game
  */

gridGame.init();
