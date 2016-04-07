'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _DataTable = require('./DataTable');

var _actions2 = require('./actions');

var _reducers = require('./reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchTable = function (_React$Component) {
  (0, _inherits3.default)(SearchTable, _React$Component);

  function SearchTable() {
    (0, _classCallCheck3.default)(this, SearchTable);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SearchTable).apply(this, arguments));
  }

  (0, _createClass3.default)(SearchTable, [{
    key: 'config',
    value: function config() {
      return {
        searchId: this.props.searchId,
        field: this.props.field,
        fetch: this.props.fetch
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _actions2.CreateSearch)(this.props.dispatch, this.config());
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _actions2.DeleteSearch)(this.props.dispatch, this.config());
    }
  }, {
    key: 'search',
    value: function search() {
      var _this2 = this;

      var search = this.props.reduxSearches.find(function (s) {
        return s.get('id') === _this2.props.searchId;
      }) || _reducers.defaultReduxSearch;
      return search.toJS();
    }
  }, {
    key: 'dispatch',
    value: function dispatch(actionName) {
      var _actions;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var action = (_actions = (0, _actions2.actions)(this.config()))[actionName].apply(_actions, args);
      this.props.dispatch(action);
    }
  }, {
    key: 'handleHeaderClick',
    value: function handleHeaderClick(field) {
      this.dispatch('searchSortFieldChanged', field);
    }
  }, {
    key: 'handleLimitChange',
    value: function handleLimitChange(limit) {
      this.dispatch('searchLimitChanged', limit);
    }
  }, {
    key: 'handlePageChange',
    value: function handlePageChange(page) {
      this.dispatch('searchLimitChanged', page);
    }
  }, {
    key: 'handleQueryChange',
    value: function handleQueryChange(field, query, values) {
      this.dispatch('searchQueryChanged', field, query, values);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_DataTable.DataTable, (0, _extends3.default)({}, this.props, {
        headers: this.props.headers,
        rows: this.props.rows,
        search: this.search(),
        onHeaderClick: this.handleHeaderClick.bind(this),
        onLimitChange: this.handleLimitChange.bind(this),
        onPageChange: this.handlePageChange.bind(this),
        onQueryChange: _.debounce(this.handleQueryChange.bind(this), 1000) }));
    }
  }]);
  return SearchTable;
}(_react2.default.Component);

SearchTable.propTypes = {
  searchId: _react.PropTypes.string.isRequired,
  field: _react.PropTypes.string.isRequired,
  reduxSearches: _react.PropTypes.array.isRequired,
  headers: _react.PropTypes.array.isRequired,
  rows: _react.PropTypes.object.isRequired,
  fetch: _react.PropTypes.func.isRequired,
  dispatch: _react.PropTypes.func.isRequired
};
SearchTable.defaultProps = {
  reduxSearches: []
};


function mapStateToProps(state) {
  return {
    reduxSearches: state.reduxSearches
  };
}

var SearchTableContainer = (0, _reactRedux.connect)(mapStateToProps)(SearchTable);
exports.default = SearchTableContainer;