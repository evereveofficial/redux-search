'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTable = exports.ResultsInfo = undefined;

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _LimitSelect = require('./LimitSelect');

var _LimitSelect2 = _interopRequireDefault(_LimitSelect);

var _HeaderQuery = require('./HeaderQuery');

var _HeaderQuery2 = _interopRequireDefault(_HeaderQuery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHead = function (_React$Component) {
  (0, _inherits3.default)(TableHead, _React$Component);

  function TableHead(props, context) {
    (0, _classCallCheck3.default)(this, TableHead);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TableHead).call(this, props));
  }

  (0, _createClass3.default)(TableHead, [{
    key: 'sortClass',
    value: function sortClass(header) {
      if (!header.isSortable) return '';

      var search = this.props.search;

      return (0, _classnames2.default)('sorting', {
        sorting_desc: search.sort_order === 'desc',
        sorting_asc: search.sort_order !== 'desc'
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(header, ev) {
      ev.preventDefault();
      if (header.isSortable) this.props.onHeaderClick(header.field);
    }
  }, {
    key: 'header',
    value: function header(h) {
      return _react2.default.createElement(
        'th',
        {
          key: h.label,
          className: this.sortClass(h),
          onClick: this.handleClick.bind(this, h) },
        h.label
      );
    }
  }, {
    key: 'queryHeader',
    value: function queryHeader(h) {
      if (h.query) return _react2.default.createElement(
        'th',
        { className: 'query', key: h.label },
        _react2.default.createElement(_HeaderQuery2.default, { header: h, onQueryChange: this.props.onQueryChange })
      );

      return _react2.default.createElement('th', { className: 'query', key: h.label });
    }
  }, {
    key: 'render',
    value: function render() {
      var headers = this.props.headers.map(this.header.bind(this));
      var queryHeaders = this.props.headers.map(this.queryHeader.bind(this));
      var displayHeaders = _lodash2.default.some(queryHeaders);

      return _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          { role: 'row' },
          headers
        ),
        displayHeaders ? _react2.default.createElement(
          'tr',
          { role: 'row query-row' },
          queryHeaders
        ) : ''
      );
    }
  }]);
  return TableHead;
}(_react2.default.Component);

TableHead.propTypes = {
  search: _react.PropTypes.object.isRequired,
  headers: _react.PropTypes.array.isRequired,
  onHeaderClick: _react.PropTypes.func.isRequired
};

var TableFoot = function (_React$Component2) {
  (0, _inherits3.default)(TableFoot, _React$Component2);

  function TableFoot() {
    (0, _classCallCheck3.default)(this, TableFoot);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(TableFoot).apply(this, arguments));
  }

  (0, _createClass3.default)(TableFoot, [{
    key: 'header',
    value: function header(h) {
      return _react2.default.createElement(
        'th',
        { key: h.label },
        h.label
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var headers = this.props.headers.map(this.header);

      return _react2.default.createElement(
        'tfoot',
        null,
        _react2.default.createElement(
          'tr',
          null,
          headers
        )
      );
    }
  }]);
  return TableFoot;
}(_react2.default.Component);

TableFoot.propTypes = {
  headers: _react.PropTypes.array.isRequired
};

var ResultsInfo = exports.ResultsInfo = function (_React$Component3) {
  (0, _inherits3.default)(ResultsInfo, _React$Component3);

  function ResultsInfo() {
    (0, _classCallCheck3.default)(this, ResultsInfo);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ResultsInfo).apply(this, arguments));
  }

  (0, _createClass3.default)(ResultsInfo, [{
    key: 'start',
    value: function start() {
      var pageIdx = this.props.search.page - 1;
      return 1 + pageIdx * this.props.search.limit;
    }
  }, {
    key: 'end',
    value: function end() {
      var pageMax = this.props.search.limit * parseInt(this.props.search.page);
      return pageMax > this.props.search.total_count ? this.props.search.total_count : pageMax;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'dataTables_info', role: 'status' },
        'Showing ',
        this.start(),
        ' to ',
        this.end(),
        ' of ',
        this.props.search.total_count,
        ' entries'
      );
    }
  }]);
  return ResultsInfo;
}(_react2.default.Component);

ResultsInfo.propTypes = {
  search: _react.PropTypes.object.isRequired
};

var DataTable = exports.DataTable = function (_React$Component4) {
  (0, _inherits3.default)(DataTable, _React$Component4);

  function DataTable() {
    (0, _classCallCheck3.default)(this, DataTable);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DataTable).apply(this, arguments));
  }

  (0, _createClass3.default)(DataTable, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'dataTables_wrapper form-inline dt-bootstrap' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-sm-5' },
            _react2.default.createElement(
              'div',
              { className: 'dataTables_length' },
              _react2.default.createElement(
                'label',
                null,
                'Show ',
                _react2.default.createElement(_LimitSelect2.default, {
                  search: this.props.search,
                  onLimitChange: this.props.onLimitChange }),
                ' entries'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-sm-7' },
            _react2.default.createElement(_Pagination2.default, {
              search: this.props.search,
              onPageChange: this.props.onPageChange })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-sm-12' },
            _react2.default.createElement(
              'table',
              { className: 'table table-striped table-bordered table-hover dataTables-example dataTable' },
              _react2.default.createElement(TableHead, (0, _extends3.default)({}, this.props, { headers: this.props.headers })),
              _react2.default.createElement(
                'tbody',
                null,
                this.props.rows
              ),
              _react2.default.createElement(TableFoot, { headers: this.props.headers })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-sm-5' },
            _react2.default.createElement(ResultsInfo, { search: this.props.search })
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-sm-7' },
            _react2.default.createElement(_Pagination2.default, {
              search: this.props.search,
              onPageChange: this.props.onPageChange })
          )
        )
      );
    }
  }]);
  return DataTable;
}(_react2.default.Component);

DataTable.propTypes = {
  rows: _react.PropTypes.object.isRequired,
  headers: _react.PropTypes.array.isRequired
};