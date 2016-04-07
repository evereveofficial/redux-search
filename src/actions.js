export const CREATE_NEW_SEARCH = "CREATE_NEW_SEARCH"
export const DELETE_SEARCH = "DELETE_SEARCH"
export const SEARCH_FIELD_CHANGED = "SEARCH_FIELD_CHANGED"
export const SEARCH_LIMIT_CHANGED = "SEARCH_LIMIT_CHANGED"
export const SEARCH_PAGE_CHANGED = "SEARCH_PAGE_CHANGED"
export const SEARCH_QUERY_CHANGED = "SEARCH_QUERY_CHANGED"
export const SEARCH_RESULTS_UPDATED = "SEARCH_RESULTS_UPDATED"

export const INITIALIZE_RANGE_QUERY = "INITIALIZE_RANGE_QUERY"
export const RANGE_QUERY_START_UPDATED = "RANGE_QUERY_START_UPDATED"
export const RANGE_QUERY_END_UPDATED = "RANGE_QUERY_END_UPDATED"

const fetcher = config => dispatch =>
  dispatch(config.fetch(config.searchId)).then(resp =>
    dispatch({
      type: SEARCH_RESULTS_UPDATED,
      total_count: resp.data.total_count,
      id: config.searchId
    }))

export function CreateSearch(dispatch, config) {
  const fetch = fetcher(config)
  dispatch({
    type: CREATE_NEW_SEARCH,
    searchId: config.searchId,
    field: config.field,
    order: config.order || ''
  })
  return fetch(dispatch)
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
    searchSortFieldChanged: (field) => {
      return function(dispatch) {
        dispatch({
          type: SEARCH_FIELD_CHANGED,
          field: field,
          id: config.searchId
        })
        return fetch(dispatch)
      }
    },
    searchLimitChanged: (limit) => {
      return function(dispatch) {
        dispatch({
          type: SEARCH_LIMIT_CHANGED,
          limit: limit,
          id: config.searchId
        })
        return fetch(dispatch)
      }
    },
    searchPageChanged: (page) => {
      return function(dispatch) {
        dispatch({
          type: SEARCH_PAGE_CHANGED,
          page: page,
          id: config.searchId
        })
        return fetch(dispatch)
      }
    },
    searchQueryChanged: function(field, query, values) {
      return function(dispatch) {
        dispatch({
          type: SEARCH_QUERY_CHANGED,
          field: field,
          query: query,
          values: values,
          id: config.searchId
        })
        return fetch(dispatch)
      }
    }
  }
}


