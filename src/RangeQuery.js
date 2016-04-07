import React, {PropTypes} from 'react'
import {
  INITIALIZE_RANGE_QUERY,
  RANGE_QUERY_START_UPDATED,
  RANGE_QUERY_END_UPDATED
} from './actions'

class RangeQuery extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    min: PropTypes.string,
    max: PropTypes.string,
    updateMin: PropTypes.func.isRequired,
    updateMax: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { min, max, header } = this.props
    if (min != nextProps.min || max != nextProps.max) {

      const values = typeof(header.query.format) === 'function' ?
        [header.query.format(nextProps.min), header.query.format(nextProps.max)] :
        [nextProps.min, nextProps.max]

      this.props.onQueryChange(header.field, header.query, values)
    }
  }

  submitMin(e) {
    if (e.key === 'Enter')
      this.props.updateMin(e)
  }

  submitMax(e) {
    if (e.key === 'Enter')
      this.props.updateMax(e)
  }

  render() {
    return (
      <div>
        <input className="form-control" type="text" onKeyPress={::this.submitMin} onBlur={this.props.updateMin} placeholder="min" />
        <input className="form-control" type="text" onKeyPress={::this.submitMax} onBlur={this.props.updateMax} placeholder="max" />
      </div>
    )
  }
}

export class RangeQueryContainer extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    searchId: PropTypes.string.isRequired,
    onQueryChange: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  rangeQuery() {
    const { label } = this.props.header
    return this.props.search.rangeQueries.find(q => q.label === this.props.header.label)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search.id && !this.rangeQuery()) {
      this.props.dispatch({
        type: INITIALIZE_RANGE_QUERY,
        id: this.props.searchId,
        label: this.props.header.label
      })
    }
  }

  updateMin(ev) {
    this.props.dispatch({
      type: RANGE_QUERY_START_UPDATED,
      id: this.props.searchId,
      label: this.props.header.label,
      start: ev.target.value
    })
  }

  updateMax(ev) {
    this.props.dispatch({
      type: RANGE_QUERY_END_UPDATED,
      id: this.props.searchId,
      label: this.props.header.label,
      end: ev.target.value
    })
  }

  render() {
    const query = this.rangeQuery() || {}
    return (
      <RangeQuery
        {...this.props}
        min={query.start}
        max={query.end}
        updateMin={::this.updateMin}
        updateMax={::this.updateMax} />
    )
  }
}
