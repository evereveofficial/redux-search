import { findSearchById } from './utils'
import { querify } from './reducers'

export const CREATE_NEW_SEARCH = "CREATE_NEW_SEARCH"
export const DELETE_SEARCH = "DELETE_SEARCH"
export const SEARCH_STARTED = "SEARCH_STARTED"
export const SEARCH_ENDED = "SEARCH_ENDED"
export const SEARCH_FIELD_CHANGED = "SEARCH_FIELD_CHANGED"
export const SEARCH_LIMIT_CHANGED = "SEARCH_LIMIT_CHANGED"
export const SEARCH_PAGE_CHANGED = "SEARCH_PAGE_CHANGED"
export const SEARCH_QUERY_CHANGED = "SEARCH_QUERY_CHANGED"
export const SEARCH_RESULTS_UPDATED = "SEARCH_RESULTS_UPDATED"

const fetcher = config => (dispatch, state) => {
  const searchQuery = querify(state, config.searchId, config.dataSource.searchConfig)

  dispatch({type: SEARCH_STARTED, id: config.searchId, searchQuery})
  config.dataSource.search(searchQuery, dispatch, state)
    .then(searchResponse => {
      dispatch({
        type: SEARCH_RESULTS_UPDATED,
        total_count: searchResponse.total_count,
        results: searchResponse.results || [],
        id: config.searchId
      })
      dispatch({type: SEARCH_ENDED, id: config.searchId})
    })
}

export function CreateSearch(dispatch, config) {
  dispatch({
    type: CREATE_NEW_SEARCH,
    searchId: config.searchId,
    searchConfig: config.searchConfig
  })
}

export function DeleteSearch(dispatch, config) {
  dispatch({
    type: DELETE_SEARCH,
    searchId: config.searchId
  })
}

export function actions(config) {
  const fetch = fetcher(config)

  return {
    reload: () => {
      return function(dispatch, getState) {
        return fetch(dispatch, getState())
      }
    },
    searchSortFieldChanged: (field) => {
      return function(dispatch, getState) {
        dispatch({
          type: SEARCH_FIELD_CHANGED,
          field: field,
          id: config.searchId
        })
        return fetch(dispatch, getState())
      }
    },
    searchLimitChanged: (limit) => {
      return function(dispatch, getState) {
        dispatch({
          type: SEARCH_LIMIT_CHANGED,
          limit: limit,
          id: config.searchId
        })
        return fetch(dispatch, getState())
      }
    },
    searchPageChanged: (page) => {
      return function(dispatch, getState) {
        dispatch({
          type: SEARCH_PAGE_CHANGED,
          page: page,
          id: config.searchId
        })
        return fetch(dispatch, getState())
      }
    },
    searchQueryChanged: function(field, query, values) {
      return function(dispatch, getState) {
        dispatch({
          type: SEARCH_QUERY_CHANGED,
          field: field,
          query: query,
          values: values,
          id: config.searchId
        })
        return fetch(dispatch, getState())
      }
    }
  }
}

