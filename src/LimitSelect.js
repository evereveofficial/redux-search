import React, {PropTypes} from "react"

export default class LimitSelect extends React.Component {
  static propTypes = {
    onLimitChange: PropTypes.func.isRequired,
    options: PropTypes.array
  }

  static defaultProps = {
    options: [10, 20, 50, 100]
  }

  handleChange(ev) {
    ev.preventDefault()
    this.props.onLimitChange(ev.target.value)
  }

  render() {
    const options = this.props.options.map(o =>
      <option key={o} value={o}>{o}</option>
    )

    return (
      <select className="form-control input-sm" onChange={::this.handleChange} defaultValue={this.props.search.limit}>
        {options}
      </select>
    )
  }
}

