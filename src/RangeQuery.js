import React, {PropTypes} from 'react'
import {
  INITIALIZE_RANGE_QUERY,
  RANGE_QUERY_START_UPDATED,
  RANGE_QUERY_END_UPDATED
} from './actions'

export class RangeQuery extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
  }

  handleChange(e) {
    e.preventDefault()

    const { header } = this.props
    const [ start, end ] = [this.start.value, this.end.value]
    const values = typeof(header.query.format) === 'function' ?
      [header.query.format(start), header.query.format(end)] :
      [start, end]

    this.props.onQueryChange(header.field, header.query, values)
  }

  render() {
    return (
      <div>
        <input ref={(node) => this.start = node} onChange={::this.handleChange} className="form-control" type="text" placeholder="min" />
        <input ref={(node) => this.end = node} onChange={::this.handleChange} className="form-control" type="text" placeholder="max" />
      </div>
    )
  }
}
