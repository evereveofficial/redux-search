'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pagination = function (_React$Component) {
  (0, _inherits3.default)(Pagination, _React$Component);

  function Pagination() {
    (0, _classCallCheck3.default)(this, Pagination);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Pagination).apply(this, arguments));
  }

  (0, _createClass3.default)(Pagination, [{
    key: 'allPages',
    value: function allPages() {
      var search = this.props.search;


      if (search.total_count && search.limit) {
        var numPages = Math.floor(search.total_count / search.limit) + 1;
        if (search.total_count > 0 && search.total_count % search.limit === 0) numPages--;

        var pages = _lodash2.default.range(1, numPages + 1);

        return pages;
      } else {
        return [];
      }
    }
  }, {
    key: 'pages',
    value: function pages() {
      var search = this.props.search;


      if (!search.total_count) return [];

      var pageSlots = 7;
      var all = this.allPages();

      if (all.length > pageSlots) {
        var slots = [1];

        if (search.page >= pageSlots - 2) {
          slots.push("...");

          if (search.page < all[all.length - 5]) {
            slots.push(search.page - 1);
            slots.push(search.page);
            slots.push(search.page + 1);
            slots.push("...");
            slots.push(all[all.length - 1]);
          } else {
            slots.push(all[all.length - 5]);
            slots.push(all[all.length - 4]);
            slots.push(all[all.length - 3]);
            slots.push(all[all.length - 2]);
            slots.push(all[all.length - 1]);
          }

          return slots;
        } else {
          slots.push(2);
          slots.push(3);
          slots.push(4);
          slots.push(5);
          slots.push("...");
          slots.push(all[all.length - 1]);

          return slots;
        }
      } else {
        return all.slice(0, pageSlots);
      }
    }
  }, {
    key: 'handlePageClick',
    value: function handlePageClick(page, ev) {
      ev.preventDefault();

      if (page !== this.props.search.page) this.props.onPageChange(page);
    }
  }, {
    key: 'ignorePageClick',
    value: function ignorePageClick(ev) {
      ev.preventDefault();
    }
  }, {
    key: 'previous',
    value: function previous() {
      var search = this.props.search;

      var arePreviousPages = _lodash2.default.first(this.pages()) !== search.page;
      var previousPage = search.page - 1;

      var classes = (0, _classnames2.default)('paginate_button', 'previous', {
        disabled: !arePreviousPages
      });

      return _react2.default.createElement(
        'li',
        { className: classes },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: arePreviousPages ? this.handlePageClick.bind(this, previousPage) : this.ignorePageClick },
          'Previous'
        )
      );
    }
  }, {
    key: 'next',
    value: function next() {
      var search = this.props.search;

      var areMorePages = _lodash2.default.last(this.pages()) !== search.page;
      var nextPage = search.page + 1;

      var classes = (0, _classnames2.default)('paginate_button', 'next', {
        disabled: !areMorePages
      });

      return _react2.default.createElement(
        'li',
        { className: classes },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: areMorePages ? this.handlePageClick.bind(this, nextPage) : this.ignorePageClick },
          'Next'
        )
      );
    }
  }, {
    key: 'renderPage',
    value: function renderPage(page, key) {
      var currentPage = this.props.search.page;

      var classes = (0, _classnames2.default)('paginate_button', {
        active: currentPage === parseInt(page)
      });

      return _react2.default.createElement(
        'li',
        { key: key, className: classes },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: this.handlePageClick.bind(this, page) },
          page
        )
      );
    }
  }, {
    key: 'renderBreakPage',
    value: function renderBreakPage(key) {
      return _react2.default.createElement(
        'li',
        { key: key, className: 'paginate_button disabled' },
        _react2.default.createElement(
          'a',
          { href: '#', onClick: this.ignorePageClick },
          '...'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pages = this.pages().map(function (page, idx) {
        return page === "..." ? _this2.renderBreakPage(idx) : _this2.renderPage(page, idx);
      });

      return _react2.default.createElement(
        'div',
        { className: 'dataTables_paginate paging_simple_numbers' },
        _react2.default.createElement(
          'ul',
          { className: 'pagination' },
          this.previous(),
          pages,
          this.next()
        )
      );
    }
  }]);
  return Pagination;
}(_react2.default.Component);

Pagination.propTypes = {
  search: _react.PropTypes.object.isRequired,
  onPageChange: _react.PropTypes.func.isRequired
};
exports.default = Pagination;