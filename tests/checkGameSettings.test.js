var check = require('../src/checkGameSettings');

describe('test checkGameSettings', () => {

  test('if it throws an error if settings is not an object', () => {
    var settings = '';
    expect(() => check(settings)).toThrow('Please provide the settings for the game as an object.');
  });

  test('if it throws an error if settings is not complete', () => {
    var settings = { rows: 5, columns: 5 };
    expect(() => check(settings)).toThrow('Please check the provided properties in your settings object.');
  });

  test('if it throws an error if rows property is not a number', () => {
    var settings = { rows: 'hai', columns: 5, el: 'app'};
    expect(() => check(settings).toThrow('Please check the provided properties in your settings object.'));
  });

  test('if it throws an error if columns property is not a number', () => {
    var settings = { rows: 5, columns: 'hai', el: 'app'};
    expect(() => check(settings).toThrow('Please check the provided properties in your settings object.'));
  });

  test('if it throws an error if el property is not a string', () => {
    var settings = { rows: 'hai', columns: 5, el: true};
    expect(() => check(settings).toThrow('Please check the provided properties in your settings object.'));
  });

});
