'use strict';

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

var _DataTable = require('./DataTable');

var _actions2 = require('./actions');

var _reducers = require('./reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchableComponent = function (_React$Component) {
  (0, _inherits3.default)(SearchableComponent, _React$Component);

  function SearchableComponent(props) {
    (0, _classCallCheck3.default)(this, SearchableComponent);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SearchableComponent).call(this, props));
  }

  (0, _createClass3.default)(SearchableComponent, [{
    key: 'config',
    value: function config() {
      return {
        searchId: this.props.searchId,
        dataSource: this.props.dataSource
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
  }]);
  return SearchableComponent;
}(_react2.default.Component);

SearchableComponent.propTypes = {
  searchId: _react.PropTypes.string.isRequired,
  reduxSearches: _react.PropTypes.array.isRequired,
  dataSource: _react.PropTypes.object.isRequired,
  dispatch: _react.PropTypes.func.isRequired
};
SearchableComponent.defaultProps = {
  reduxSearches: []
};