import {Map, List} from "immutable"
import createStore from './storeCreator'
import * as actions from './actions'

export const defaultReduxSearch = Map({
  id: '',
  page: 1,
  limit: 20,
  total_count: 0,
  sort_field: '',
  sort_order: 'asc',
  q: Map()
})

export function querify(state, searchId, defaultColumn) {
  const search = state.reduxSearches.find(s => s.get('id') === searchId) ||
    defaultReduxSearch.merge({ sort_field: defaultColumn })

  return _.omit(search.toJS(), 'id', 'total_count')
}

const searches = []

function initializeSearch(searchId, field, order) {
  return defaultReduxSearch.merge({
    id: searchId,
    sort_field: field,
    sort_order: order || 'asc'
  })
}

const mapState = (state, action, mutate) => {
  return state.map(search => {
    if (search.get('id') !== action.id)
      return search

    return mutate(search)
  })
}

const searchStore = createStore(searches, (state, action) => {
  return {
    [actions.CREATE_NEW_SEARCH]: () => [
      ...state,
      initializeSearch(action.searchId, action.field, action.order)
    ],

    [actions.DELETE_SEARCH]: () => _.reject(state, search => search.get('id') === action.searchId),

    [actions.SEARCH_QUERY_CHANGED]: () => mapState(state, action, (search) => {
      if(_.some(action.values || [])) {
        return search.
          setIn(['q', action.field, action.query.type], action.values).
          setIn(['page'], 1)
      } else {
        return search.deleteIn(['q', action.field, action.query.type])
      }
    }),

    [actions.SEARCH_RESULTS_UPDATED]: () => mapState(state, action, (search) => {
      return search.merge({
        total_count: action.total_count
      })
    }),

    [actions.SEARCH_PAGE_CHANGED]: () => mapState(state, action, (search) => {
      return search.merge({
        page: action.page
      })
    }),

    [actions.SEARCH_LIMIT_CHANGED]: () => mapState(state, action, (search) => {
      return search.merge({
        limit: action.limit,
        page: 1
      })
    }),

    [actions.SEARCH_FIELD_CHANGED]: () => mapState(state, action, (search) => {
      let order = 'asc'
      if (search.get('sort_field') === action.field) {
        if (search.get('sort_order') === 'asc') {
          order = 'desc'
        }
      }

      return search.merge({
        sort_field: action.field,
        sort_order: order
      })
    })
  }
})

export function reduxSearches(state=searches, action) {
  return searchStore(state, action)
}
