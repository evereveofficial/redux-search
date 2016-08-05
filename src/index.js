import SearchTableContainer from './SearchTable'
import SearchListViewContainer from './SearchListView'
import {reduxSearches, defaultReduxSearch, querify} from './reducers'
import * as actions from './actions';

const ReduxSearch = {
  SearchTable: SearchTableContainer,
  SearchListView: SearchListViewContainer,
  reduxSearches,
  defaultReduxSearch,
  querify,
  actions
}

export default ReduxSearch
