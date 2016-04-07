'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeQueryContainer = undefined;

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

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RangeQuery = function (_React$Component) {
  (0, _inherits3.default)(RangeQuery, _React$Component);

  function RangeQuery() {
    (0, _classCallCheck3.default)(this, RangeQuery);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RangeQuery).apply(this, arguments));
  }

  (0, _createClass3.default)(RangeQuery, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props;
      var min = _props.min;
      var max = _props.max;
      var header = _props.header;

      if (min != nextProps.min || max != nextProps.max) {

        var values = typeof header.query.format === 'function' ? [header.query.format(nextProps.min), header.query.format(nextProps.max)] : [nextProps.min, nextProps.max];

        this.props.onQueryChange(header.field, header.query, values);
      }
    }
  }, {
    key: 'submitMin',
    value: function submitMin(e) {
      if (e.key === 'Enter') this.props.updateMin(e);
    }
  }, {
    key: 'submitMax',
    value: function submitMax(e) {
      if (e.key === 'Enter') this.props.updateMax(e);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { className: 'form-control', type: 'text', onKeyPress: this.submitMin.bind(this), onBlur: this.props.updateMin, placeholder: 'min' }),
        _react2.default.createElement('input', { className: 'form-control', type: 'text', onKeyPress: this.submitMax.bind(this), onBlur: this.props.updateMax, placeholder: 'max' })
      );
    }
  }]);
  return RangeQuery;
}(_react2.default.Component);

RangeQuery.propTypes = {
  header: _react.PropTypes.object.isRequired,
  min: _react.PropTypes.string,
  max: _react.PropTypes.string,
  updateMin: _react.PropTypes.func.isRequired,
  updateMax: _react.PropTypes.func.isRequired
};

var RangeQueryContainer = exports.RangeQueryContainer = function (_React$Component2) {
  (0, _inherits3.default)(RangeQueryContainer, _React$Component2);

  function RangeQueryContainer() {
    (0, _classCallCheck3.default)(this, RangeQueryContainer);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RangeQueryContainer).apply(this, arguments));
  }

  (0, _createClass3.default)(RangeQueryContainer, [{
    key: 'rangeQuery',
    value: function rangeQuery() {
      var _this3 = this;

      var label = this.props.header.label;

      return this.props.search.rangeQueries.find(function (q) {
        return q.label === _this3.props.header.label;
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.search.id && !this.rangeQuery()) {
        this.props.dispatch({
          type: _actions.INITIALIZE_RANGE_QUERY,
          id: this.props.searchId,
          label: this.props.header.label
        });
      }
    }
  }, {
    key: 'updateMin',
    value: function updateMin(ev) {
      this.props.dispatch({
        type: _actions.RANGE_QUERY_START_UPDATED,
        id: this.props.searchId,
        label: this.props.header.label,
        start: ev.target.value
      });
    }
  }, {
    key: 'updateMax',
    value: function updateMax(ev) {
      this.props.dispatch({
        type: _actions.RANGE_QUERY_END_UPDATED,
        id: this.props.searchId,
        label: this.props.header.label,
        end: ev.target.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var query = this.rangeQuery() || {};
      return _react2.default.createElement(RangeQuery, (0, _extends3.default)({}, this.props, {
        min: query.start,
        max: query.end,
        updateMin: this.updateMin.bind(this),
        updateMax: this.updateMax.bind(this) }));
    }
  }]);
  return RangeQueryContainer;
}(_react2.default.Component);

RangeQueryContainer.propTypes = {
  header: _react.PropTypes.object.isRequired,
  searchId: _react.PropTypes.string.isRequired,
  onQueryChange: _react.PropTypes.func.isRequired,
  dispatch: _react.PropTypes.func.isRequired
};