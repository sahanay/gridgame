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
