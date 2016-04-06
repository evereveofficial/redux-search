'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SearchTable = require('./SearchTable');

var _SearchTable2 = _interopRequireDefault(_SearchTable);

var _reducers = require('./reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReduxSearch = {
  SearchTable: _SearchTable2.default,
  reduxSearches: _reducers.reduxSearches,
  defaultReduxSearch: _reducers.defaultReduxSearch
};

exports.default = ReduxSearch;