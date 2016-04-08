'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeQuery = undefined;

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

var _QueryInput = require('./QueryInput');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeQuery = exports.RangeQuery = function (_React$Component) {
  (0, _inherits3.default)(RangeQuery, _React$Component);

  function RangeQuery() {
    (0, _classCallCheck3.default)(this, RangeQuery);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RangeQuery).apply(this, arguments));
  }

  (0, _createClass3.default)(RangeQuery, [{
    key: 'handleChange',
    value: function handleChange() {
      var header = this.props.header;
      var start = this.start.value;
      var end = this.end.value;

      var values = typeof header.query.format === 'function' ? [header.query.format(start), header.query.format(end)] : [start, end];

      this.props.onQueryChange(header.field, header.query, values);
    }
  }, {
    key: 'queryChange',
    value: function queryChange() {
      var _this2 = this;

      return function (header, e) {
        return _this2.handleChange();
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_QueryInput.QueryInput, (0, _extends3.default)({}, this.props, {
          update: function update(node) {
            return _this3.start = node;
          },
          queryChange: this.queryChange(),
          placeholder: 'min' })),
        _react2.default.createElement(_QueryInput.QueryInput, (0, _extends3.default)({}, this.props, {
          update: function update(node) {
            return _this3.end = node;
          },
          queryChange: this.queryChange(),
          placeholder: 'max' }))
      );
    }
  }]);
  return RangeQuery;
}(_react2.default.Component);

RangeQuery.propTypes = {
  header: _react.PropTypes.object.isRequired
};