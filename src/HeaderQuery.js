import React, {PropTypes} from "react"
import _ from 'lodash'

const queryChange = (onChange, header, ev) => {
  const values = [ev.target.value].
    reject(v => _.isNull(v) || _.isUndefined(v))
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
      <input className="form-control" type="text" onChange={this.handleChange} />
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
      <select className="form-control" onChange={this.handleChange}>
        <option value=""></option>
        {options.map(([label, value]) => <option key={value} value={value}>{label}</option>)}
      </select>
    )
  }
}

class RangeQuery extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    onQueryChange: PropTypes.func.isRequired
  }

  handleChange(ev) {
    const { header } = this.props

    const start = _.isEmpty(this.refs.start.value) ? null : this.refs.start.value
    const end = _.isEmpty(this.refs.end.value) ? null : this.refs.end.value

    const values = typeof(header.query.format) === 'function' ?
      [header.query.fmtValue(start), header.query.fmtValue(end)] :
      [start, end]

    this.props.onQueryChange(header.field, header.query, values)
  }

  render() {
    return (
      <div>
        <input className="form-control" type="text" ref="start" onChange={this.handleChange} placeholder="min" />
        <input className="form-control" type="text" ref="end"   onChange={this.handleChange} placeholder="max" />
      </div>
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
      <Query header={header} query={header.query} onQueryChange={this.props.onQueryChange} />
    )
  }
}

