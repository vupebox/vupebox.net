"use strict";

var _getAll = _interopRequireDefault(require("./getAll"));

var _addOne = _interopRequireDefault(require("./addOne"));

var _getOne = _interopRequireDefault(require("./getOne"));

var _editOne = _interopRequireDefault(require("./editOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  getAll: _getAll.default,
  addOne: _addOne.default,
  getOne: _getOne.default,
  editOne: _editOne.default
};