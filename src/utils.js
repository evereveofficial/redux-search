import {Map} from 'immutable'

export function findSearchById(state, searchId) {
  const existingState = state.reduxSearches.find(s => s.get('id') === searchId)

  return existingState ? existingState.toJS() : Map()
}
