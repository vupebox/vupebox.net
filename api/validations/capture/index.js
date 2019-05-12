"use strict";

var _addOne = _interopRequireDefault(require("./addOne"));

var _getCaptureData = _interopRequireDefault(require("./getCaptureData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  addOne: _addOne.default,
  getCaptureData: _getCaptureData.default
};