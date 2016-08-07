import DataSource from './DataSource'
import SearchTableContainer from './SearchTable'
import SearchListViewContainer from './SearchListView'
import {reduxSearches, defaultReduxSearch, querify} from './reducers'
import * as actions from './actions'
import * as utils from './utils'

const ReduxSearch = {
  DataSource,
  SearchTable: SearchTableContainer,
  SearchListView: SearchListViewContainer,
  reduxSearches,
  defaultReduxSearch,
  querify,
  actions,
  utils
}

export default ReduxSearch
