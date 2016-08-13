import React, {PropTypes} from 'react'
import RangeQuery from './RangeQuery'
import QueryInput, {DateInput} from './QueryInput'
import _ from 'lodash'

const queryChange = (onChange, header, value) => {
  const values = _.reject([value], v => {
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

  queryChange() {
    return (header, val) => {
      queryChange(this.props.onQueryChange, header, val)
    }
  }

  render() {
    return (
      <QueryInput {...this.props} queryChange={this.queryChange()} />
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
    queryChange(this.props.onQueryChange, header, ev.target.value)
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

class DateEqQuery extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    onQueryChange: PropTypes.func.isRequired
  }

  queryChange() {
    return (header, val) => {
      // Replace 'date_eq' with 'eq'
      // TODO: We probably need to separate component type keys from query type keys.
      const updatedHeader = _.merge({}, header, {query: {type: 'eq'}})

      queryChange(this.props.onQueryChange, updatedHeader, val)
    }
  }

  render() {
    return (
      <DateInput {...this.props} queryChange={this.queryChange()} />
    )
  }
}

const components = {
  like: LikeQuery,
  eq: EqQuery,
  date_eq: DateEqQuery,
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
      <Query
        {...this.props}
        header={header}
        query={header.query} />
    )
  }
}

