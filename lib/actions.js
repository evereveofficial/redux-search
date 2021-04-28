'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEARCH_RESULTS_UPDATED = exports.SEARCH_QUERY_CHANGED = exports.SEARCH_PAGE_CHANGED = exports.SEARCH_LIMIT_CHANGED = exports.SEARCH_FIELD_CHANGED = exports.SEARCH_ENDED = exports.SEARCH_STARTED = exports.DELETE_SEARCH = exports.CREATE_NEW_SEARCH = undefined;
exports.CreateSearch = CreateSearch;
exports.DeleteSearch = DeleteSearch;
exports.actions = actions;

var _utils = require('./utils');

var _reducers = require('./reducers');

var CREATE_NEW_SEARCH = exports.CREATE_NEW_SEARCH = "CREATE_NEW_SEARCH";
var DELETE_SEARCH = exports.DELETE_SEARCH = "DELETE_SEARCH";
var SEARCH_STARTED = exports.SEARCH_STARTED = "SEARCH_STARTED";
var SEARCH_ENDED = exports.SEARCH_ENDED = "SEARCH_ENDED";
var SEARCH_FIELD_CHANGED = exports.SEARCH_FIELD_CHANGED = "SEARCH_FIELD_CHANGED";
var SEARCH_LIMIT_CHANGED = exports.SEARCH_LIMIT_CHANGED = "SEARCH_LIMIT_CHANGED";
var SEARCH_PAGE_CHANGED = exports.SEARCH_PAGE_CHANGED = "SEARCH_PAGE_CHANGED";
var SEARCH_QUERY_CHANGED = exports.SEARCH_QUERY_CHANGED = "SEARCH_QUERY_CHANGED";
var SEARCH_RESULTS_UPDATED = exports.SEARCH_RESULTS_UPDATED = "SEARCH_RESULTS_UPDATED";

var fetcher = function fetcher(config) {
  return function (dispatch, state) {
    // Generate a unique request ID so the reducers can ignore delayed async
    // responses. We only want last response to affect the end state.
    var searchRequestId = _.uniqueId(config.searchId + '_');
    var searchQuery = (0, _reducers.querify)(state, config.searchId, config.dataSource.initialSearchQuery);

    dispatch({ type: SEARCH_STARTED, id: config.searchId, searchQuery: searchQuery, searchRequestId: searchRequestId });
    config.dataSource.search(searchQuery, dispatch, state).then(function (searchResponse) {
      dispatch({
        type: SEARCH_RESULTS_UPDATED,
        total_count: searchResponse.total_count,
        results: searchResponse.results || [],
        id: config.searchId,
        searchRequestId: searchRequestId
      });
      dispatch({ type: SEARCH_ENDED, id: config.searchId });
    });
  };
};

function CreateSearch(dispatch, config) {
  dispatch({
    type: CREATE_NEW_SEARCH,
    searchId: config.searchId,
    initialSearchQuery: config.initialSearchQuery
  });
}

function DeleteSearch(dispatch, config) {
  dispatch({
    type: DELETE_SEARCH,
    searchId: config.searchId
  });
}

function actions(config) {
  var fetch = fetcher(config);

  return {
    reload: function reload(pathName) {
      return function (dispatch, getState) {
        
        return pathName === '/orders' || pathName ===  '/customers' ? '' : fetch(dispatch, getState());
      };
    },
    searchSortFieldChanged: function searchSortFieldChanged(field) {
      return function (dispatch, getState) {
        dispatch({
          type: SEARCH_FIELD_CHANGED,
          field: field,
          id: config.searchId
        });
        return fetch(dispatch, getState());
      };
    },
    searchLimitChanged: function searchLimitChanged(limit) {
      return function (dispatch, getState) {
        dispatch({
          type: SEARCH_LIMIT_CHANGED,
          limit: limit,
          id: config.searchId
        });
        return fetch(dispatch, getState());
      };
    },
    searchPageChanged: function searchPageChanged(page) {
      return function (dispatch, getState) {
        dispatch({
          type: SEARCH_PAGE_CHANGED,
          page: page,
          id: config.searchId
        });
        return fetch(dispatch, getState());
      };
    },
    searchQueryChanged: function searchQueryChanged(field, query, values, pathName) {
      return function (dispatch, getState) {
        dispatch({
          type: SEARCH_QUERY_CHANGED,
          field: field,
          query: query,
          values: values,
          id: config.searchId
        });
        
        return pathName === '/orders' || pathName ===  '/customers' ? '' : fetch(dispatch, getState());
      };
    }
  };
}