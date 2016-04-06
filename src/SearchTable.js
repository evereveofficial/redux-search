import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class SearchTable extends React.Component {
  static propTypes = {
    reduxSearches: PropTypes.array.isRequired
  }
}

function mapStateToProps(state) {
  return {
    reduxSearches: state.reduxSearches
  }
}

export const SearchTableContainer = connect(mapStateToProps)(SearchTable)

