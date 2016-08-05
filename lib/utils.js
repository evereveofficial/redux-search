'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSearchById = findSearchById;

var _immutable = require('immutable');

function findSearchById(state, searchId) {
  var existingState = state.reduxSearches.find(function (s) {
    return s.get('id') === searchId;
  });

  return existingState ? existingState.toJS() : (0, _immutable.Map)();
}