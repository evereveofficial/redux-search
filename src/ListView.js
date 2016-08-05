import React, {PropTypes} from "react"

export class ListView extends React.Component {
  static propTypes = {
    renderRow: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
    renderRow: PropTypes.func.isRequired,
  }

  render() {
    const {
      renderRow,
      search,
      onPageChange
    } = this.props;

    const loadingIconStyle = {
      display: search.isSearching ? 'block' : 'none',
      width: '100%',
      marginTop: '15px'
    };

    const buttonStyle = {
      display: (!search.isSearching && search.total_count > search.results.length) ? 'block' : 'none',
    };

    return (
      <div className="feed-activity-list">
        {search.results.map(row =>
          <div className="feed-element">{renderRow(row)}</div>
        )}
        <div style={{textAlign: 'center'}}>
          <button className="btn btn-primary btn-block m-t" style={buttonStyle} onClick={onPageChange}>
            <i className="fa fa-arrow-down"></i> Show More
          </button>
          <i className="fa fa-spinner fa-pulse fa-2x" style={loadingIconStyle}></i>
        </div>
      </div>
    )
  }
}
