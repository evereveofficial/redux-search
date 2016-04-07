import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {DataTable} from './DataTable'
import {CreateSearch, DeleteSearch, actions} from './actions'
import {defaultReduxSearch} from './reducers'

class SearchTable extends React.Component {
  static propTypes = {
    searchId: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    reduxSearches: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    rows: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    reduxSearches: []
  }

  config() {
    return {
      searchId: this.props.searchId,
      field: this.props.field,
      fetch: this.props.fetch
    }
  }

  componentDidMount() {
    CreateSearch(this.props.dispatch, this.config())
  }

  componentWillUnmount() {
    DeleteSearch(this.props.dispatch, this.config())
  }

  search() {
    const search = this.props.reduxSearches.find(s => s.get('id') === this.props.searchId) || defaultReduxSearch
    return search.toJS()
  }

  dispatch(actionName, ...args) {
    const action = actions(this.config())[actionName](...args)
    this.props.dispatch(action)
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
    this.dispatch('searchQueryChanged', field, query, values)
  }

  render() {
    return (
      <DataTable
        {...this.props}
        headers={this.props.headers}
        rows={this.props.rows}
        search={this.search()}
        onHeaderClick={::this.handleHeaderClick}
        onLimitChange={::this.handleLimitChange}
        onPageChange={::this.handlePageChange}
        onQueryChange={_.debounce(::this.handleQueryChange, 1000)} />
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

