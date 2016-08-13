'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateInput = exports.CompletedInput = exports.KeyPressInput = undefined;

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeyPressInput = exports.KeyPressInput = function (_React$Component) {
  (0, _inherits3.default)(KeyPressInput, _React$Component);

  function KeyPressInput() {
    (0, _classCallCheck3.default)(this, KeyPressInput);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(KeyPressInput).apply(this, arguments));
  }

  (0, _createClass3.default)(KeyPressInput, [{
    key: 'handleChange',
    value: function handleChange(ev) {
      var header = this.props.header;

      this.props.queryChange(header, ev.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', (0, _extends3.default)({}, this.props, { ref: this.props.update, className: 'form-control', type: 'text', onChange: this.handleChange.bind(this) }));
    }
  }]);
  return KeyPressInput;
}(_react2.default.Component);

KeyPressInput.propTypes = {
  header: _react.PropTypes.object.isRequired,
  queryChange: _react.PropTypes.func.isRequired
};

var CompletedInput = exports.CompletedInput = function (_React$Component2) {
  (0, _inherits3.default)(CompletedInput, _React$Component2);

  function CompletedInput() {
    (0, _classCallCheck3.default)(this, CompletedInput);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CompletedInput).apply(this, arguments));
  }

  (0, _createClass3.default)(CompletedInput, [{
    key: 'handleChange',
    value: function handleChange(ev) {
      var header = this.props.header;

      this.props.queryChange(header, ev.target.value);
    }
  }, {
    key: 'submit',
    value: function submit(ev) {
      if (ev.key === 'Enter') this.handleChange(ev);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', (0, _extends3.default)({}, this.props, { ref: this.props.update, className: 'form-control', type: 'text', onKeyPress: this.submit.bind(this), onBlur: this.handleChange.bind(this) }));
    }
  }]);
  return CompletedInput;
}(_react2.default.Component);

CompletedInput.propTypes = {
  header: _react.PropTypes.object.isRequired,
  queryChange: _react.PropTypes.func.isRequired
};

var QueryInput = function (_React$Component3) {
  (0, _inherits3.default)(QueryInput, _React$Component3);

  function QueryInput() {
    (0, _classCallCheck3.default)(this, QueryInput);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(QueryInput).apply(this, arguments));
  }

  (0, _createClass3.default)(QueryInput, [{
    key: 'debounced',
    value: function debounced() {
      return _lodash2.default.debounce(this.props.queryChange, 1000);
    }
  }, {
    key: 'updateRef',
    value: function updateRef() {
      var noop = function noop() {};
      return this.props.update || noop;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.updateOnKeyPress) return _react2.default.createElement(KeyPressInput, (0, _extends3.default)({}, this.props, { update: this.updateRef(), queryChange: this.debounced() }));

      return _react2.default.createElement(CompletedInput, (0, _extends3.default)({}, this.props, { update: this.updateRef() }));
    }
  }]);
  return QueryInput;
}(_react2.default.Component);

QueryInput.propTypes = {
  header: _react.PropTypes.object.isRequired,
  queryChange: _react.PropTypes.func.isRequired
};
exports.default = QueryInput;

var DateInput = exports.DateInput = function (_React$Component4) {
  (0, _inherits3.default)(DateInput, _React$Component4);

  function DateInput() {
    (0, _classCallCheck3.default)(this, DateInput);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DateInput).apply(this, arguments));
  }

  (0, _createClass3.default)(DateInput, [{
    key: 'debounced',
    value: function debounced() {
      return _lodash2.default.debounce(this.props.queryChange, 1000);
    }
  }, {
    key: 'updateRef',
    value: function updateRef() {
      var noop = function noop() {};
      return this.props.update || noop;
    }
  }, {
    key: 'handleChange',
    value: function handleChange(ev) {
      var header = this.props.header;

      this.props.queryChange(header, ev.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', (0, _extends3.default)({}, this.props, {
        ref: this.props.update,
        className: 'form-control',
        type: 'date',
        onChange: this.handleChange.bind(this)
      }));
    }
  }]);
  return DateInput;
}(_react2.default.Component);

DateInput.propTypes = {
  header: _react.PropTypes.object.isRequired,
  queryChange: _react.PropTypes.func.isRequired
};