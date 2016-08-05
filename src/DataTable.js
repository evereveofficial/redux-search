import React, {PropTypes} from "react"
import _ from 'lodash'
import classnames from 'classnames'
import Pagination from "./Pagination"
import LimitSelect from "./LimitSelect"
import HeaderQuery from "./HeaderQuery"

class HeaderQueryRow extends React.Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired
  }

  render() {
    const queryHeaders = this.props.headers.filter(h => h.query)
    if (_.isEmpty(queryHeaders))
      return false;

    return (
      <tr role="row query-row">
        {
          this.props.headers.map(h => {
            if (h.query)
              return (
                <th className="query" key={h.label}>
                  <HeaderQuery {...this.props} header={h} onQueryChange={this.props.onQueryChange} />
                </th>
              )

            return <th className="query" key={h.label}></th>
          })
        }
      </tr>
    )
  }
}

class TableHead extends React.Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    onHeaderClick: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props)
  }

  sortClass(header) {
    if(!header.isSortable)
      return ''

    const { search } = this.props;
    return classnames('sorting', {
      sorting_desc: search.sort_order === 'desc',
      sorting_asc: search.sort_order !== 'desc'
    })
  }

  handleClick(header, ev) {
    ev.preventDefault()
    if(header.isSortable)
      this.props.onHeaderClick(header.field)
  }

  header(h) {
    return (
      <th
        key={h.label}
        className={this.sortClass(h)}
        onClick={this.handleClick.bind(this, h)}>{h.label}
      </th>
    )
  }

  render() {
    const headers = this.props.headers.map(::this.header)

    return (
      <thead>
        <tr role="row">{headers}</tr>
        <HeaderQueryRow {...this.props} />
      </thead>
    )
  }
}

class TableFoot extends React.Component {
  static propTypes = {
    headers: PropTypes.array.isRequired
  }

  header(h) {
    return <th key={h.label}>{h.label}</th>
  }

  render() {
    const headers = this.props.headers.map(this.header)

    return (
      <tfoot><tr>{headers}</tr></tfoot>
    )
  }
}

export class ResultsInfo extends React.Component {
  static propTypes = {
    search: PropTypes.object.isRequired
  }

  start() {
    const pageIdx = this.props.search.page - 1
    return 1 + (pageIdx * this.props.search.limit)
  }

  end() {
    const pageMax = this.props.search.limit * parseInt(this.props.search.page)
    return pageMax > this.props.search.total_count ? this.props.search.total_count : pageMax
  }

  render() {
    return (
      <div className="dataTables_info" role="status">
        Showing {this.start()} to {this.end()} of {this.props.search.total_count} entries
      </div>
    )
  }
}

export class DataTable extends React.Component {
  static propTypes = {
    renderRow: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired
  }

  render() {
    const {
      search,
      headers,
      onLimitChange,
      onPageChange,
    } = this.props;

    return (
      <div className="dataTables_wrapper form-inline dt-bootstrap">
        <div className="row">
          <div className="col-sm-5">
            <div className="dataTables_length">
              <label>
                Show&nbsp;
                  <LimitSelect
                    search={search}
                    onLimitChange={onLimitChange} />
                &nbsp;entries
              </label>
            </div>
          </div>
          <div className="col-sm-7">
            <Pagination
              search={search}
              onPageChange={onPageChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-striped table-bordered table-hover dataTables-example dataTable">
              <TableHead {...this.props} headers={headers}></TableHead>
              <tbody>{search.results.map(row => renderRow(row))}</tbody>
              <TableFoot headers={headers}></TableFoot>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <ResultsInfo search={search} />
          </div>
          <div className="col-sm-7">
            <Pagination
              search={search}
              onPageChange={onPageChange} />
          </div>
        </div>
      </div>
    )
  }
}

