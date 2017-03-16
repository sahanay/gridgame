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
