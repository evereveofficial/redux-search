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

var _ListView = require('./ListView');

var _actions2 = require('./actions');

var _reducers = require('./reducers');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchListView = function (_React$Component) {
  (0, _inherits3.default)(SearchListView, _React$Component);

  function SearchListView() {
    (0, _classCallCheck3.default)(this, SearchListView);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SearchListView).apply(this, arguments));
  }

  (0, _createClass3.default)(SearchListView, [{
    key: 'config',
    value: function config() {
      var _props = this.props;
      var searchId = _props.searchId;
      var dataSource = _props.dataSource;


      return {
        searchId: searchId,
        dataSource: dataSource,
        initialSearchQuery: _lodash2.default.merge({}, dataSource.initialSearchQuery, { resultsUpdateStyle: 'append' })
      };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      (0, _actions2.CreateSearch)(this.props.dispatch, this.config());
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.dispatch('reload');
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
    key: 'handlePageChange',
    value: function handlePageChange(page) {
      this.dispatch('searchPageChanged', this.search().page + 1);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ListView.ListView, (0, _extends3.default)({}, this.props, {
        search: this.search(),
        onPageChange: this.handlePageChange.bind(this)
      }));
    }
  }]);
  return SearchListView;
}(_react2.default.Component);

SearchListView.propTypes = {
  searchId: _react.PropTypes.string.isRequired,
  reduxSearches: _react.PropTypes.array.isRequired,
  renderRow: _react.PropTypes.func.isRequired,
  dataSource: _react.PropTypes.object.isRequired,
  dispatch: _react.PropTypes.func.isRequired
};
SearchListView.defaultProps = {
  reduxSearches: []
};


function mapStateToProps(state) {
  return {
    reduxSearches: state.reduxSearches
  };
}

var SearchListViewContainer = (0, _reactRedux.connect)(mapStateToProps)(SearchListView);
exports.default = SearchListViewContainer;