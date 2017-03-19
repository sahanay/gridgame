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
  * @return {boolean}
  *
  */

  function checkGameSettings(settings) {

    // check if settings is an objects
    // otherwise throw error
    if (typeof settings !== 'object') {
      throw new Error('Please provide the settings for the game as an object.');
    }

    // check if settings contains the properties:
    // - rows {integer}
    // - columns {integer}
    // - el {settings}
    // otherwise throw error
    if (!(settings.hasOwnProperty('rows')    && typeof settings.rows    == 'number' &&
          settings.hasOwnProperty('columns') && typeof settings.columns == 'number' &&
          settings.hasOwnProperty('el')      && typeof settings.el      == 'string')) {
      
      throw new Error('Please check the provided properties in your settings object.');
    }

    // in any other case, return true
    return true;
  }

module.exports = checkGameSettings;
