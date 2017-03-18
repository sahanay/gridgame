/**
  * constructor FiboToZeroSetter
  *
  * This functions takes a three parameters as its values
  * and uses these values to retrieves the indexes that needs to
  * be set to 0 based on the first 5 values of the fibonacci sequence.
  *
  *
  * @param <Array> arr (the current array of the row)
  * @param <Integer> rowIndex (the row index of this cell)
  * @param <DOMElement> table (reference to the table element)
  *
  *
  */

function FiboToZeroSetter (arr, rowIndex, table) {
  this.values   = arr;
  this.rowIndex = rowIndex;
  this.table    = table;
};

/**
  * returnIndexes
  *
  * sets this.indexes equal to all the cellIndexes within the row
  * that needs to be set to 0
  */
FiboToZeroSetter.prototype.returnIndexes = function() {
  this.indexes = (function check(arr, index, indexes) {

    var _arr = arr;
    var _indexes = indexes || [];
    var _currentIndex = index || 0;

    if (_currentIndex === _arr.length) {
      return _indexes
    }

    var _nr2 = _currentIndex + 1;
    var _nr3 = _currentIndex + 2;
    var _nr4 = _currentIndex + 3;
    var _nr5 = _currentIndex + 4;


    if (_arr[_currentIndex] === 1 &&
        _arr[_nr2] === 1 &&
        _arr[_nr3] === 2 &&
        _arr[_nr4] === 3 &&
        _arr[_nr5] === 5
        ) {
          _indexes.push(_currentIndex, _nr2, _nr3, _nr4, _nr5);
        }

    return check(_arr, _nr2, _indexes);
  })(this.values);
  return this;
};

/**
  * setsValuesToZero
  *
  * Uses this.indexes, this.rowIndex and this.table
  * to select the dom elements whose textContent needs to be
  * set to zero and sets them to zero.
  *
  */
FiboToZeroSetter.prototype.setValuesToZero = function() {

  var allCellIndexes = this.indexes,
      currentRow = this.rowIndex,
      gridgame = this.table;


  if (allCellIndexes.length <= 0) { return };

  allCellIndexes.forEach(function(index) {
    setElementToZero(index);
  });

  function setElementToZero(cellIndex) {
    var _cellIndex = cellIndex,
        _rowIndex  = currentRow,
        _table     = gridgame,
        _thisCell  = _table.rows[_rowIndex].cells[_cellIndex]
        VALUE     = 0;

    // Set the values of all the rows to 0
    _thisCell.textContent = VALUE;

    // add and remove .green class
    _thisCell.classList.add('green');

    setTimeout(function() {
      _thisCell.classList.remove('green');
      _thisCell.classList.remove('black-text');
    }, 951);

  }

};

module.exports = FiboToZeroSetter;
