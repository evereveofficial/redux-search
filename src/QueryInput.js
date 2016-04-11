import React, {PropTypes} from 'react'
import _ from 'lodash'


export class KeyPressInput extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    queryChange: PropTypes.func.isRequired
  }

  handleChange(ev) {
    const { header } = this.props
    this.props.queryChange(header, ev.target.value)
  }

  render() {
    return (
      <input {...this.props} ref={this.props.update} className="form-control" type="text" onChange={::this.handleChange} />
    )
  }
}

export class CompletedInput extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    queryChange: PropTypes.func.isRequired
  }

  handleChange(ev) {
    const { header } = this.props
    this.props.queryChange(header, ev.target.value)
  }

  submit(ev) {
    if (ev.key === 'Enter')
      this.handleChange(ev)
  }

  render() {
    return (
      <input {...this.props} ref={this.props.update} className="form-control" type="text" onKeyPress={::this.submit} onBlur={::this.handleChange} />
    )
  }
}

export default class QueryInput extends React.Component {
  static propTypes = {
    header: PropTypes.object.isRequired,
    queryChange: PropTypes.func.isRequired
  }

  debounced() {
    return _.debounce(this.props.queryChange, 1000)
  }

  updateRef() {
    const noop = () => { }
    return this.props.update || noop
  }

  render() {
    if (this.props.updateOnKeyPress)
      return <KeyPressInput {...this.props} update={this.updateRef()} queryChange={this.debounced()}  />

    return <CompletedInput {...this.props} update={this.updateRef()} />
  }
}
