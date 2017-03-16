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
