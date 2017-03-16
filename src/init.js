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
