import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {DataTable} from './DataTable'
import {CreateSearch, DeleteSearch, actions} from './actions'
import {defaultReduxSearch} from './reducers'

class SearchTable extends React.Component {
  static propTypes = {
    searchId: PropTypes.string.isRequired,
    reduxSearches: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    renderRow: PropTypes.func.isRequired,
    dataSource: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    updateOnKeyPress: PropTypes.bool
  }

  static defaultProps = {
    updateOnKeyPress: false
  }

  static defaultProps = {
    reduxSearches: []
  }

  config() {
    const { searchId, dataSource } = this.props;

    return {
      searchId,
      dataSource,
      initialSearchQuery: dataSource.initialSearchQuery
    }
  }

  componentWillMount() {
    CreateSearch(this.props.dispatch, this.config())
  }

  componentDidMount() {
    var pathName = this.props.location.pathname;
    this.dispatch('reload', pathName);
  }

  componentWillUnmount() {
    DeleteSearch(this.props.dispatch, this.config())
  }

  search() {
    const search = this.props.reduxSearches.find(s => s.get('id') === this.props.searchId) || defaultReduxSearch
    return search.toJS()
  }

  dispatch(actionName, ...args) {
    const action = actions(this.config())[actionName](...args);
    this.props.dispatch(action);
  }

  handleHeaderClick(field) {
    this.dispatch('searchSortFieldChanged', field)
  }

  handleLimitChange(limit) {
    this.dispatch('searchLimitChanged', limit)
  }

  handlePageChange(page) {
    this.dispatch('searchPageChanged', page)
  }

  handleQueryChange(field, query, values) {
    var pathName = this.props.location.pathname;
    this.dispatch('searchQueryChanged', field, query, values, pathName);
  }

  render() {
    return (
      <DataTable
        {...this.props}
        search={this.search()}
        onHeaderClick={::this.handleHeaderClick}
        onLimitChange={::this.handleLimitChange}
        onPageChange={::this.handlePageChange}
        onQueryChange={::this.handleQueryChange} />
    )
  }
}

function mapStateToProps(state) {
  return {
    reduxSearches: state.reduxSearches
  }
}

const SearchTableContainer = connect(mapStateToProps)(SearchTable)
export default SearchTableContainer

