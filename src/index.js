/*
 *
 * Grid App Q42
 *
 * Grid app van 50 bij 50 waarbij iedere klik
 * op een cel de huidige met +1 verhoogt. Als 5 cellen
 * naast elkaar op een rij gelijk zijn aan een fibinacci
 * reeks, dan worden de waarden terug gezet naar 0.
 *
 */

/**
  *
  * Load module dependencies.
  *
  */

var init        = require('./init'),
    $create     = require('./utils').create,
    check       = require('./checkGameSettings');


/**
  *
  * Function GridGame
  *
  * @param
  *
  */

function GridGame(gameSettings) {

  // checks if gameSettings is an object and has the required properties
  // otherwise it throws an error
  check(gameSettings);

  this.rows    = gameSettings.rows;
  this.columns = gameSettings.columns;
  this.el      = gameSettings.el;
  this.table   = $create('table');

}

GridGame.prototype.init       = init;

module.exports = GridGame;
