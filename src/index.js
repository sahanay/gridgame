/*
 *
 * Grid App
 *
 * A simple grid app which creates a table,
 * of the provided columns and rows, and changes
 * the value of each cell in the column and row
 * of the clicked cell.
 *
 * If a fibonacci sequence in a row appears, it then
 * sets the value back to 0.
 *
 */

/**
  * Load dependencies.
  */

var init        = require('./init'),
    $create     = require('./utils').create,
    check       = require('./checkGameSettings');

/**
  *
  * GridGame Constructor
  *
  * @param {Object} gameSettings (contains the settings for the gridgame)
  *
  */

'use strict';

function GridGame(gameSettings) {

  // checks if gameSettings is an object and has the required properties
  // otherwise it throws an error
  check(gameSettings);

  this.rows    = gameSettings.rows;
  this.columns = gameSettings.columns;
  this.el      = gameSettings.el;
  this.table   = $create('table');

}

GridGame.prototype.init = init;

module.exports = GridGame;
