"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var queryChange = function queryChange(onChange, header, ev) {
  var values = [ev.target.value].reject(function (v) {
    return _lodash2.default.isNull(v) || _lodash2.default.isUndefined(v);
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
    key: "handleChange",
    value: function handleChange(ev) {
      var header = this.props.header;

      queryChange(this.props.onQueryChange, header, ev);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement("input", { className: "form-control", type: "text", onChange: this.handleChange });
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
    key: "handleChange",
    value: function handleChange(ev) {
      var header = this.props.header;

      queryChange(this.props.onQueryChange, header, ev);
    }
  }, {
    key: "render",
    value: function render() {
      var header = this.props.header;


      var mapper = _lodash2.default.isArray(header.query.options) ? function (pair) {
        return [pair[0], pair[1]];
      } : function (k, v) {
        return [k, v];
      };

      var options = _lodash2.default.map(header.query.options, mapper);

      return _react2.default.createElement(
        "select",
        { className: "form-control", onChange: this.handleChange },
        _react2.default.createElement("option", { value: "" }),
        options.map(function (_ref) {
          var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

          var label = _ref2[0];
          var value = _ref2[1];
          return _react2.default.createElement(
            "option",
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

var RangeQuery = function (_React$Component4) {
  (0, _inherits3.default)(RangeQuery, _React$Component4);

  function RangeQuery() {
    (0, _classCallCheck3.default)(this, RangeQuery);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(RangeQuery).apply(this, arguments));
  }

  (0, _createClass3.default)(RangeQuery, [{
    key: "handleChange",
    value: function handleChange(ev) {
      var header = this.props.header;


      var start = _lodash2.default.isEmpty(this.refs.start.value) ? null : this.refs.start.value;
      var end = _lodash2.default.isEmpty(this.refs.end.value) ? null : this.refs.end.value;

      var values = typeof header.query.format === 'function' ? [header.query.fmtValue(start), header.query.fmtValue(end)] : [start, end];

      this.props.onQueryChange(header.field, header.query, values);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement("input", { className: "form-control", type: "text", ref: "start", onChange: this.handleChange, placeholder: "min" }),
        _react2.default.createElement("input", { className: "form-control", type: "text", ref: "end", onChange: this.handleChange, placeholder: "max" })
      );
    }
  }]);
  return RangeQuery;
}(_react2.default.Component);

RangeQuery.propTypes = {
  header: _react.PropTypes.object.isRequired,
  onQueryChange: _react.PropTypes.func.isRequired
};


var components = {
  like: LikeQuery,
  eq: EqQuery,
  range: RangeQuery
};

var HeaderQuery = function (_React$Component5) {
  (0, _inherits3.default)(HeaderQuery, _React$Component5);

  function HeaderQuery() {
    (0, _classCallCheck3.default)(this, HeaderQuery);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(HeaderQuery).apply(this, arguments));
  }

  (0, _createClass3.default)(HeaderQuery, [{
    key: "render",
    value: function render() {
      var _props = this.props;
      var header = _props.header;
      var onQueryChange = _props.onQueryChange;

      var Query = components[header.query.type] || NoQuery;

      return _react2.default.createElement(Query, { header: header, query: header.query, onQueryChange: this.props.onQueryChange });
    }
  }]);
  return HeaderQuery;
}(_react2.default.Component);

HeaderQuery.propTypes = {
  header: _react.PropTypes.object.isRequired,
  onQueryChange: _react.PropTypes.func.isRequired
};
exports.default = HeaderQuery;