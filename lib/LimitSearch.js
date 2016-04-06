"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LimitSelect = function (_React$Component) {
  (0, _inherits3.default)(LimitSelect, _React$Component);

  function LimitSelect() {
    (0, _classCallCheck3.default)(this, LimitSelect);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LimitSelect).apply(this, arguments));
  }

  (0, _createClass3.default)(LimitSelect, [{
    key: "handleChange",
    value: function handleChange(ev) {
      ev.preventDefault();
      this.props.onLimitChange(ev.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      var options = this.props.options.map(function (o) {
        return _react2.default.createElement(
          "option",
          { key: o, value: o },
          o
        );
      });

      return;
      _react2.default.createElement(
        "select",
        { className: "form-control input-sm", onChange: this.handleChange, defaultValue: this.props.search.limit },
        options
      );
    }
  }]);
  return LimitSelect;
}(_react2.default.Component);

LimitSelect.propTypes = {
  onLimitChange: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.array
};
LimitSelect.defaultProps = {
  options: [10, 20, 50, 100]
};
exports.default = LimitSelect;