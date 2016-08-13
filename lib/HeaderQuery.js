'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RangeQuery = require('./RangeQuery');

var _RangeQuery2 = _interopRequireDefault(_RangeQuery);

var _QueryInput = require('./QueryInput');

var _QueryInput2 = _interopRequireDefault(_QueryInput);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _queryChange = function _queryChange(onChange, header, value) {
  var values = _lodash2.default.reject([value], function (v) {
    _lodash2.default.isNull(v) || _lodash2.default.isUndefined(v);
  });
  onChange(header.field, header.query, values);
};

var NoQuery = function (_React$Component) {
  (0, _inherits3.default)(NoQuery, _React$Component);

  function NoQuery() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, NoQuery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(NoQuery)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.render = function () {
      return false;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  return NoQuery;
}(_react2.default.Component);

var LikeQuery = function (_React$Component2) {
  (0, _inherits3.default)(LikeQuery, _React$Component2);

  function LikeQuery() {
    (0, _classCallCheck3.default)(this, LikeQuery);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LikeQuery).apply(this, arguments));
  }

  (0, _createClass3.default)(LikeQuery, [{
    key: 'queryChange',
    value: function queryChange() {
      var _this3 = this;

      return function (header, val) {
        _queryChange(_this3.props.onQueryChange, header, val);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_QueryInput2.default, (0, _extends3.default)({}, this.props, { queryChange: this.queryChange() }));
    }
  }]);
  return LikeQuery;
}(_react2.default.Component);

LikeQuery.propTypes = {
  header: _react.PropTypes.object.isRequired,
  onQueryChange: _react.PropTypes.func.isRequired
};

var EqQuery = function (_React$Component3) {
  (0, _inherits3.default)(EqQuery, _React$Component3);

  function EqQuery() {
    (0, _classCallCheck3.default)(this, EqQuery);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(EqQuery).apply(this, arguments));
  }

  (0, _createClass3.default)(EqQuery, [{
    key: 'handleChange',
    value: function handleChange(ev) {
      var header = this.props.header;

      _queryChange(this.props.onQueryChange, header, ev.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var header = this.props.header;


      var mapper = _lodash2.default.isArray(header.query.options) ? function (pair) {
        return [pair[0], pair[1]];
      } : function (k, v) {
        return [k, v];
      };

      var options = _lodash2.default.map(header.query.options, mapper);

      return _react2.default.createElement(
        'select',
        { className: 'form-control', onChange: this.handleChange.bind(this) },
        _react2.default.createElement('option', { value: '' }),
        options.map(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

          var label = _ref2[0];
          var value = _ref2[1];
          return _react2.default.createElement(
            'option',
            { key: value, value: value },
            label
          );
        })
      );
    }
  }]);
  return EqQuery;
}(_react2.default.Component);

EqQuery.propTypes = {
  header: _react.PropTypes.object.isRequired,
  onQueryChange: _react.PropTypes.func.isRequired
};

var DateEqQuery = function (_React$Component4) {
  (0, _inherits3.default)(DateEqQuery, _React$Component4);

  function DateEqQuery() {
    (0, _classCallCheck3.default)(this, DateEqQuery);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DateEqQuery).apply(this, arguments));
  }

  (0, _createClass3.default)(DateEqQuery, [{
    key: 'queryChange',
    value: function queryChange() {
      var _this6 = this;

      return function (header, val) {
        // Replace 'date_eq' with 'eq'
        // TODO: We probably need to separate component type keys from query type keys.
        var updatedHeader = _lodash2.default.merge({}, header, { query: { type: 'eq' } });

        _queryChange(_this6.props.onQueryChange, updatedHeader, val);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_QueryInput.DateInput, (0, _extends3.default)({}, this.props, { queryChange: this.queryChange() }));
    }
  }]);
  return DateEqQuery;
}(_react2.default.Component);

DateEqQuery.propTypes = {
  header: _react.PropTypes.object.isRequired,
  onQueryChange: _react.PropTypes.func.isRequired
};


var components = {
  like: LikeQuery,
  eq: EqQuery,
  date_eq: DateEqQuery,
  range: _RangeQuery2.default
};

var HeaderQuery = function (_React$Component5) {
  (0, _inherits3.default)(HeaderQuery, _React$Component5);

  function HeaderQuery() {
    (0, _classCallCheck3.default)(this, HeaderQuery);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HeaderQuery).apply(this, arguments));
  }

  (0, _createClass3.default)(HeaderQuery, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var header = _props.header;
      var onQueryChange = _props.onQueryChange;

      var Query = components[header.query.type] || NoQuery;

      return _react2.default.createElement(Query, (0, _extends3.default)({}, this.props, {
        header: header,
        query: header.query }));
    }
  }]);
  return HeaderQuery;
}(_react2.default.Component);

HeaderQuery.propTypes = {
  header: _react.PropTypes.object.isRequired,
  onQueryChange: _react.PropTypes.func.isRequired
};
exports.default = HeaderQuery;