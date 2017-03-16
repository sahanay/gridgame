(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
  * checkForFibonacci
  *
  * This functions takes a MutationRecord
  * as it's argument and checks whether the
  * provided node's textContent value is equal
  * to 5. If so, then it will retrieve the elements
  * to it's left to check whether a fibonacci
  * sequence is at play here.
  *
  * If there is a fibonacci sequence, this function then
  * will set the textContent value of the elements to 0
  * and apply the css class 'fibonacci'.
  *
  * @param  <MutationRecord>
  *
  */

'use strict'

function checkForFibonacci(mutationRecord) {

  var cell      = mutationRecord.target;
  var cellIndex = cell.cellIndex;
  var cellValue = parseInt(cell.textContent);
  var row       = cell.closest('tr');

  if (cellValue !== 5 ) {
    return;
  }

  console.log('yeah...')

}

module.exports = checkForFibonacci;

},{}],2:[function(require,module,exports){
/**
  *
  * checkGameSettings
  *
  * Checks the provided object on three conditions
  * - if it's an object
  * - if it contains the properties rows, columns and element
  * - the types of the properties
  *
  * @param {Object} <settings>
  * @return {Boolean}
  *
  */

  function checkGameSettings(settings) {
    if (typeof settings !== 'object') {
      throw new Error('Please provide the settings for the game as an object.');
    }

    if (!(settings.hasOwnProperty('rows')    && typeof settings.rows    == 'number' &&
          settings.hasOwnProperty('columns') && typeof settings.columns == 'number' &&
          settings.hasOwnProperty('el')      && typeof settings.el      == 'string')) {

      throw new Error('Please check the provided properties in your settings object.');
    }

    return true;
  }

module.exports = checkGameSettings;

},{}],3:[function(require,module,exports){
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

},{"./checkGameSettings":2,"./init":4,"./utils":7}],4:[function(require,module,exports){
/**
  *
  * Initializer
  *
  * Creates the game after receiving the
  * amount of rows and columns.
  *
  */

/**
  * Load module dependencies
  */
var $id               = require('./utils').id,
    $create           = require('./utils').create,
    updateNode        = require('./updateNode'),
    checkForFibonacci = require('./checkForFibonacci'),
    MutationObserver  = window.MutationObserver ||
                        window.WebKitMutationObserver ||
                        window.MozMutationObserver;

'use strict'

function init() {

  // in this app we make use of the Element.closest() Web API.
  // Due to compatibility issues (i.e. it not being supported by
  // IE & Edge), a polyfill is provided to extend the Element prototype.
  // with thanx to MDN: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
  }

  var rows    = this.rows,
      columns = this.columns,
      node    = $id(this.el),
      table   = this.table;

  node.style.width  = "95vw";
  node.style.height = "95vh";
  node.style.margin = "10px";
  node.style.margin = "0 auto";

  table.id = "gridgame";


  node.appendChild(table);

  // creates a table with the rows and columns
  // corresponding to the amount of rows and columns
  // provided by the user
  // further it adds MutationObservers to each cell
  // and also an eventlistener listening for click-events
  for (var i = 0; i < rows; i++) {

    (function() {

      var row = $create("tr");

      for (var j = 0; j < columns; j++) {

        (function() {

          var cell = $create("td");

          cell.addEventListener('click', updateNode);
          cell.innerText = 1;
          var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              checkForFibonacci(mutation);
            });
          });

          var configuration = { childList: true };

          observer.observe(cell, configuration);

          row.appendChild(cell);

        })();

      }

      table.appendChild(row);

    })();
  }

}

module.exports = init;

},{"./checkForFibonacci":1,"./updateNode":6,"./utils":7}],5:[function(require,module,exports){
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

},{"./index":3}],6:[function(require,module,exports){
/**
  *
  * updateNode
  *
  * The updateNode function takes an event as its parameter,
  * retrieves the target of the event and based on this target,
  * all cells in its current row and column are updated with a +1.
  *
  * We use textContent instead of innerText to make sure our MutationObservers
  * are firing when value of the cell changes.
  *
  * @param <Element>
  * @return <Boolean>
  *
  */

/**
  * Load module dependencies
  */
var $id     = require('./utils').id;

'use strict'

function updateNode(event) {

  var table        = $id('gridgame'),
      el           = event.target,
      thisRowNr    = el.closest('tr').rowIndex,
      thisColumnNr = el.cellIndex,
      allCellsRow  = table.rows[thisRowNr].cells,
      allRows      = table.rows;


  // updates each cell in the column of the event.target cell
  function updateColumn(rows, cellIndex, index) {

    var _currentCellIndex = cellIndex,
        _index            = index || 0,
        _rowsLength       = rows.length,
        _rows             = rows;

    if (_rowsLength === 0 || _rowsLength <= _index )  { return false };
    var _cells             = _rows[_index].cells;

    for (var i = 0; i < _cells.length; i++) {

      // here we prevent duplicate updates of the event.target
      // because the updateRow function already updates this
      // cell
      if (el === _cells[i]) { continue };

      // update only the cells whose cellIndex number is
      // equal to that of the event.target
      if (_cells[i].cellIndex === _currentCellIndex) {

        (function() {

          var currentValue    = parseInt(_cells[i].textContent);
          var newValue = currentValue + 1;
          _cells[i].textContent = newValue;

        })();

      }
    }

    updateColumn(_rows, _currentCellIndex, _index + 1);
  }

  // updates each cell in the row of the event.target cell
  function updateRow(rowCells) {

    var _rowCells = rowCells;

    for (var i = 0; i < _rowCells.length; i++) {

      var cell = _rowCells[i];
      var value = parseInt(cell.textContent);
      var newValue = value + 1;
      cell.textContent = newValue;
    }

  }

  // ignite updates
  updateColumn(allRows, thisColumnNr);
  updateRow(allCellsRow);

}

module.exports = updateNode;

},{"./utils":7}],7:[function(require,module,exports){
/**
  * Utilities
  */

var utils = {

  id: function(id) {
    return document.getElementById(id);
  },
  
  create: function(elementName) {
    return document.createElement(elementName);
  },

  tableIndexNR: function(element) {
    return element.closest('tr').indexNumber;
  }

}

module.exports = utils;

},{}]},{},[5]);
