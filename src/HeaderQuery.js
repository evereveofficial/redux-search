import React, {PropTypes} from 'react'
import {RangeQuery} from './RangeQuery'
import _ from 'lodash'

const queryChange = (onChange, header, ev) => {
  const values = _.reject([ev.target.value], v => {
    _.isNull(v) || _.isUndefined(v)
  })
  onChange(header.field, header.query, values)
}

class NoQuery extends React.Component {
  render = () => false
}

class LikeQuery extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    onQueryChange: PropTypes.func.isRequired
  }

  handleChange(ev) {
    const { header } = this.props
    queryChange(this.props.onQueryChange, header, ev)
  }

  render() {
    return (
      <input className="form-control" type="text" onChange={::this.handleChange} />
    )
  }
}

class EqQuery extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    onQueryChange: PropTypes.func.isRequired
  }

  handleChange(ev) {
    const { header } = this.props
    queryChange(this.props.onQueryChange, header, ev)
  }

  render() {
    const { header } = this.props

    const mapper = _.isArray(header.query.options) ?
      pair => [pair[0], pair[1]] :
      (k, v) => [k, v]

    const options = _.map(header.query.options, mapper)

    return (
      <select className="form-control" onChange={::this.handleChange}>
        <option value=""></option>
        {options.map(([label, value]) => <option key={value} value={value}>{label}</option>)}
      </select>
    )
  }
}

const components = {
  like: LikeQuery,
  eq: EqQuery,
  range: RangeQuery
}

export default class HeaderQuery extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    onQueryChange: PropTypes.func.isRequired
  }

  render() {
    const { header, onQueryChange } = this.props
    const Query = components[header.query.type] || NoQuery

    return (
      <Query {...this.props} header={header} query={header.query} onQueryChange={this.props.onQueryChange} />
    )
  }
}

