import React, {PropTypes} from 'react'
import {QueryInput} from './QueryInput'

import {
  INITIALIZE_RANGE_QUERY,
  RANGE_QUERY_START_UPDATED,
  RANGE_QUERY_END_UPDATED
} from './actions'

export class RangeQuery extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
  }

  handleChange() {
    const { header } = this.props
    const [ start, end ] = [this.start.value, this.end.value]
    const values = typeof(header.query.format) === 'function' ?
      [header.query.format(start), header.query.format(end)] :
      [start, end]

    this.props.onQueryChange(header.field, header.query, values)
  }

  queryChange() {
    return (header, e) => this.handleChange()
  }

  render() {
    return (
      <div>
        <QueryInput
          {...this.props}
          update={(node) => this.start = node}
          queryChange={this.queryChange()}
          placeholder="min" />
        <QueryInput
          {...this.props}
          update={(node) => this.end = node}
          queryChange={this.queryChange()}
          placeholder="max" />
      </div>
    )
  }
}
