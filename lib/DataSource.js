"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataSource = function DataSource(searchFunc, config) {
  (0, _classCallCheck3.default)(this, DataSource);

  this.search = searchFunc;
  this.initialSearchQuery = config;
};

exports.default = DataSource;