/**
  * Utilities
  */

var utils = {

  id: function(id) {
    return document.getElementById(id);
  },

  create: function(elementName) {
    return document.createElement(elementName);
  }

}

module.exports = utils;
