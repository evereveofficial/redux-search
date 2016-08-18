'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultReduxSearch = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.querify = querify;
exports.reduxSearches = reduxSearches;

var _immutable = require('immutable');

var _storeCreator = require('./storeCreator');

var _storeCreator2 = _interopRequireDefault(_storeCreator);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultReduxSearch = exports.defaultReduxSearch = (0, _immutable.Map)({
  id: '',
  total_count: 0,
  results: (0, _immutable.List)(),
  resultsUpdateStyle: 'replace', // Valid options: replace and append
  isSearching: false,
  page: 1,
  limit: 20,
  sort_field: '',
  sort_order: 'asc',
  q: (0, _immutable.Map)(),
  searchRequestId: null
});

function querify(state, searchId, dataSourceSearchConfig) {
  var search = state.reduxSearches.find(function (s) {
    return s.get('id') === searchId;
  }) || defaultReduxSearch.merge(dataSourceSearchConfig);

  return _.omit(search.toJS(), 'id', 'total_count', 'results', 'isSearching', 'resultsUpdateStyle');
}

var searches = [];

function initializeSearch(searchId, initialSearchQuery) {
  return defaultReduxSearch.merge((0, _extends3.default)({
    id: searchId
  }, initialSearchQuery));
}

var mapState = function mapState(state, action, mutate) {
  return state.map(function (search) {
    if (search.get('id') !== action.id) return search;

    return mutate(search);
  });
};

var searchStore = (0, _storeCreator2.default)(searches, function (state, action) {
  var _ref;

  return _ref = {}, (0, _defineProperty3.default)(_ref, actions.CREATE_NEW_SEARCH, function () {
    return [].concat((0, _toConsumableArray3.default)(state), [initializeSearch(action.searchId, action.initialSearchQuery)]);
  }), (0, _defineProperty3.default)(_ref, actions.DELETE_SEARCH, function () {
    return _.reject(state, function (search) {
      return search.get('id') === action.searchId;
    });
  }), (0, _defineProperty3.default)(_ref, actions.SEARCH_STARTED, function () {
    return mapState(state, action, function (search) {
      return search.merge({ isSearching: true, searchRequestId: action.searchRequestId });
    });
  }), (0, _defineProperty3.default)(_ref, actions.SEARCH_ENDED, function () {
    return mapState(state, action, function (search) {
      return search.merge({ isSearching: false });
    });
  }), (0, _defineProperty3.default)(_ref, actions.SEARCH_QUERY_CHANGED, function () {
    return mapState(state, action, function (search) {
      if (_.some(action.values || [])) {
        return search.setIn(['q', action.field, action.query.type], action.values).setIn(['page'], 1);
      } else {
        return search.deleteIn(['q', action.field, action.query.type]);
      }
    });
  }), (0, _defineProperty3.default)(_ref, actions.SEARCH_RESULTS_UPDATED, function () {
    return mapState(state, action, function (search) {
      if (action.searchRequestId === search.get('searchRequestId')) {
        var _search$get;

        return search.merge({
          total_count: action.total_count,
          results: search.get('resultsUpdateStyle') === 'append' ? (_search$get = search.get('results')).push.apply(_search$get, (0, _toConsumableArray3.default)(action.results)) : action.results
        });
      } else {
        return search;
      }
    });
  }), (0, _defineProperty3.default)(_ref, actions.SEARCH_PAGE_CHANGED, function () {
    return mapState(state, action, function (search) {
      return search.merge({
        page: action.page
      });
    });
  }), (0, _defineProperty3.default)(_ref, actions.SEARCH_LIMIT_CHANGED, function () {
    return mapState(state, action, function (search) {
      return search.merge({
        limit: action.limit,
        page: 1
      });
    });
  }), (0, _defineProperty3.default)(_ref, actions.SEARCH_FIELD_CHANGED, function () {
    return mapState(state, action, function (search) {
      var order = 'asc';
      if (search.get('sort_field') === action.field) {
        if (search.get('sort_order') === 'asc') {
          order = 'desc';
        }
      }

      return search.merge({
        sort_field: action.field,
        sort_order: order
      });
    });
  }), _ref;
});

function reduxSearches() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? searches : arguments[0];
  var action = arguments[1];

  return searchStore(state, action);
}