import React, {PropTypes} from "react"
import _ from 'lodash'
import classnames from 'classnames'
import Pagination from "./Pagination"
import LimitSelect from "./LimitSelect"
import HeaderQuery from "./HeaderQuery"

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

    return classnames('sorting', {
      sorting_desc: this.props.sort_order === 'desc',
      sorting_asc: this.props.sort_order !== 'desc'
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

  queryHeader(h) {
    if (h.query)
      return (
        <th className="query" key={h.label}>
          <HeaderQuery header={h} onQueryChange={this.props.onQueryChange} />
        </th>
      )

    return <th className="query" key={h.label}></th>
  }

  render() {
    const headers = this.props.headers.map(::this.header)
    const queryHeaders = this.props.headers.map(::this.queryHeader)
    const displayHeaders = _.some(queryHeaders)

    return (
      <thead>
        <tr role="row">{headers}</tr>
        {displayHeaders ? (<tr role="row query-row">{queryHeaders}</tr>) : ''}
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
    rows: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired
  }

  render() {
    return (
      <div className="dataTables_wrapper form-inline dt-bootstrap">
        <div className="row">
          <div className="col-sm-5">
            <div className="dataTables_length">
              <label>
                Show&nbsp;
                  <LimitSelect
                    search={this.props.search}
                    onLimitChange={this.props.onLimitChange} />
                &nbsp;entries
              </label>
            </div>
          </div>
          <div className="col-sm-7">
            <Pagination
              search={this.props.search}
              onPageChange={this.props.onPageChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-striped table-bordered table-hover dataTables-example dataTable">
              <TableHead {...this.props} headers={this.props.headers}></TableHead>
              <tbody>{this.props.rows}</tbody>
              <TableFoot headers={this.props.headers}></TableFoot>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-5">
            <ResultsInfo search={this.props.search} />
          </div>
          <div className="col-sm-7">
            <Pagination
              search={this.props.search}
              onPageChange={this.props.onPageChange} />
          </div>
        </div>
      </div>
    )
  }
}

