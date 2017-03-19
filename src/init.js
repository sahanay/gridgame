/**
  *
  * Initializer
  *
  * Creates the game after receiving the
  * amount of rows and columns.
  *
  */

/**
  * Load dependencies
  */
    // utils
var $id               = require('./utils').id,
    $create           = require('./utils').create,
    
    // operators
    updateNode        = require('./updateNode'),
    FiboToZeroSetter  = require('./FiboToZeroSetter'),
    
    // set mutationobserver if not present in window
    MutationObserver  = window.MutationObserver ||
                        window.WebKitMutationObserver ||
                        window.MozMutationObserver;

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
      table   = this.table,

      // Here we save each tablerow as an array inside
      // the rowsArr. Each array contains the values of the cell.
      // The cellIndex of the cells correspond to the location
      // of its value in the array.
      // We use this array for the checkForFibonacci function.
      tableRowsArr = [];

  // Set id for the table for the updateNode function
  table.id = "gridgame";

  node.appendChild(table);

  // This for-loop creates a table with the rows and columns
  // corresponding to the amount of rows and columns
  // provided by the user
  for (var i = 0; i < rows; i++) {

    (function() {

      var row = $create("tr");
      var rowArray = [];

      for (var j = 0; j < columns; j++) {

        (function() {

          var cell = $create("td");
          rowArray.push(0);

          cell.addEventListener('click', updateNode);
          cell.innerText = 0;
          var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {

              if (parseInt(mutation.target.textContent) >= 6) { return };

              var _cell = mutation.target,
                  _cellIndex = cell.cellIndex,
                  _cellValue = parseInt(cell.textContent),
                  _row = cell.closest('tr'),
                  _rowIndex = _row.rowIndex,
                  _table = $id('gridgame');

              // update the new cellvalue
              tableRowsArr[_rowIndex][_cellIndex] = _cellValue;

              var _rowArray = tableRowsArr[_rowIndex];

              new FiboToZeroSetter(_rowArray, _rowIndex, _table)
                    .returnIndexes()
                    .setValuesToZero();

            });
          });
          
          // setup observer
          var configuration = { childList: true };
          observer.observe(cell, configuration);
         
          row.appendChild(cell);

        })();

      }
      
      tableRowsArr.push(rowArray);
      table.appendChild(row);

    })();
  }

}

module.exports = init;
