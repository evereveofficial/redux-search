'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListView = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListView = exports.ListView = function (_React$Component) {
  (0, _inherits3.default)(ListView, _React$Component);

  function ListView() {
    (0, _classCallCheck3.default)(this, ListView);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ListView).apply(this, arguments));
  }

  (0, _createClass3.default)(ListView, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var renderRow = _props.renderRow;
      var search = _props.search;
      var onPageChange = _props.onPageChange;


      var loadingIconStyle = {
        display: search.isSearching ? 'block' : 'none',
        width: '100%',
        marginTop: '15px'
      };

      var buttonStyle = {
        display: !search.isSearching && search.total_count > search.results.length ? 'block' : 'none'
      };

      return _react2.default.createElement(
        'div',
        { className: 'feed-activity-list' },
        search.results.map(function (row) {
          return _react2.default.createElement(
            'div',
            { className: 'feed-element' },
            renderRow(row)
          );
        }),
        _react2.default.createElement(
          'div',
          { style: { textAlign: 'center' } },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary btn-block m-t', style: buttonStyle, onClick: onPageChange },
            _react2.default.createElement('i', { className: 'fa fa-arrow-down' }),
            ' Show More'
          ),
          _react2.default.createElement('i', { className: 'fa fa-spinner fa-pulse fa-2x', style: loadingIconStyle })
        )
      );
    }
  }]);
  return ListView;
}(_react2.default.Component);

ListView.propTypes = (0, _defineProperty3.default)({
  renderRow: _react.PropTypes.func.isRequired,
  search: _react.PropTypes.object.isRequired,
  onPageChange: _react.PropTypes.func.isRequired
}, 'renderRow', _react.PropTypes.func.isRequired);