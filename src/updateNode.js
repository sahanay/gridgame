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
  *
  */

/**
  * Load module dependencies
  */
var $id     = require('./utils').id;


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

    var _cells = _rows[_index].cells;

    for (var i = 0; i < _cells.length; i++) {

      // here we prevent duplicate updates of the event.target
      // because the updateRow function already updates this
      // cell
      var thisCell = _cells[i]
      if (el === thisCell) { continue };

      // update only the cells whose cellIndex number is
      // equal to that of the event.target
      if (_cells[i].cellIndex === _currentCellIndex) {

        // IIFE to prevent collusion with the row setTimeout function
        (function() {
          var cell              = thisCell,
              currentValue      = parseInt(cell.textContent),
              newValue          = currentValue + 1;

          cell.textContent = newValue;
          cell.classList.add('bright-yellow');

          setTimeout(function() {
            cell.classList.remove('bright-yellow');
            cell.classList.add('black-text');
          }, 950);
        })();

      }
    }

    updateColumn(_rows, _currentCellIndex, _index + 1);
  }

  // updates each cell in the row of the event.target cell
  function updateRow(rowCells) {

    var _rowCells = rowCells;

    for (var i = 0; i < _rowCells.length; i++) {

      // prevent collusion with column setTimeout funtion
      (function() {
        var cell = _rowCells[i],
            value = parseInt(cell.textContent),
            newValue = value + 1;

        cell.textContent = newValue;
        cell.classList.add('bright-yellow');

        setTimeout(function() {
          cell.classList.remove('bright-yellow');
          cell.classList.add('black-text');
        }, 950);
      })();

    }

  }

  // ignite updates
  updateColumn(allRows, thisColumnNr);
  updateRow(allCellsRow);

}

module.exports = updateNode;
