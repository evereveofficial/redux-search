"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSearch = CreateSearch;
exports.DeleteSearch = DeleteSearch;
exports.actions = actions;
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
  return function (dispatch) {
    dispatch({ type: SEARCH_STARTED, id: config.searchId });
    dispatch(config.fetch(config.searchId)).then(function (resp) {
      dispatch({
        type: SEARCH_RESULTS_UPDATED,
        total_count: resp.data.total_count,
        results: resp.data.results || [],
        id: config.searchId
      });
      dispatch({ type: SEARCH_ENDED, id: config.searchId });
    });
  };
};

function CreateSearch(dispatch, config) {
  var fetch = fetcher(config);
  dispatch({
    type: CREATE_NEW_SEARCH,
    searchId: config.searchId,
    searchConfig: config.searchConfig
  });
  return fetch(dispatch);
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