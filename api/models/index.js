"use strict";

var _User = _interopRequireDefault(require("./User"));

var _Product = _interopRequireDefault(require("./Product"));

var _Capture = _interopRequireDefault(require("./Capture"));

var _CaptureProduct = _interopRequireDefault(require("./CaptureProduct"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  User: _User.default,
  Product: _Product.default,
  Capture: _Capture.default,
  CaptureProduct: _CaptureProduct.default
};