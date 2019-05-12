"use strict";

var _addOne = _interopRequireDefault(require("./addOne"));

var _editOne = _interopRequireDefault(require("./editOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  addOne: _addOne.default,
  editOne: _editOne.default
};