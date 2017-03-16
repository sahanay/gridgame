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
