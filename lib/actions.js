"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSearch = CreateSearch;
exports.actions = actions;
var CREATE_NEW_SEARCH = exports.CREATE_NEW_SEARCH = "CREATE_NEW_SEARCH";
var SEARCH_FIELD_CHANGED = exports.SEARCH_FIELD_CHANGED = "SEARCH_FIELD_CHANGED";
var SEARCH_LIMIT_CHANGED = exports.SEARCH_LIMIT_CHANGED = "SEARCH_LIMIT_CHANGED";
var SEARCH_PAGE_CHANGED = exports.SEARCH_PAGE_CHANGED = "SEARCH_PAGE_CHANGED";
var SEARCH_QUERY_CHANGED = exports.SEARCH_QUERY_CHANGED = "SEARCH_QUERY_CHANGED";
var SEARCH_RESULTS_UPDATED = exports.SEARCH_RESULTS_UPDATED = "SEARCH_RESULTS_UPDATED";

var INITIALIZE_RANGE_QUERY = exports.INITIALIZE_RANGE_QUERY = "INITIALIZE_RANGE_QUERY";
var RANGE_QUERY_START_UPDATED = exports.RANGE_QUERY_START_UPDATED = "RANGE_QUERY_START_UPDATED";
var RANGE_QUERY_END_UPDATED = exports.RANGE_QUERY_END_UPDATED = "RANGE_QUERY_END_UPDATED";

var fetcher = function fetcher(config) {
  return function (dispatch) {
    return dispatch(config.fetch(config.searchId)).then(function (resp) {
      return dispatch({
        type: SEARCH_RESULTS_UPDATED,
        total_count: resp.data.total_count,
        id: config.searchId
      });
    });
  };
};

function CreateSearch(dispatch, config) {
  var fetch = fetcher(config);
  dispatch({
    type: CREATE_NEW_SEARCH,
    searchId: config.searchId,
    field: config.field,
    order: config.order || ''
  });
  return fetch(dispatch);
}

function actions(config) {
  var fetch = fetcher(config);

  return {
    searchSortFieldChanged: function searchSortFieldChanged(field) {
      return function (dispatch) {
        dispatch({
          type: SEARCH_FIELD_CHANGED,
          field: field,
          id: config.searchId
        });
        return fetch(dispatch);
      };
    },
    searchLimitChanged: function searchLimitChanged(limit) {
      return function (dispatch) {
        dispatch({
          type: SEARCH_LIMIT_CHANGED,
          limit: limit,
          id: config.searchId
        });
        return fetch(dispatch);
      };
    },
    searchPageChanged: function searchPageChanged(page) {
      return function (dispatch) {
        dispatch({
          type: SEARCH_PAGE_CHANGED,
          page: page,
          id: config.searchId
        });
        return fetch(dispatch);
      };
    },
    searchQueryChanged: function searchQueryChanged(field, query, values) {
      return function (dispatch) {
        dispatch({
          type: SEARCH_QUERY_CHANGED,
          field: field,
          query: query,
          values: values,
          id: config.searchId
        });
        return fetch(dispatch);
      };
    }
  };
}