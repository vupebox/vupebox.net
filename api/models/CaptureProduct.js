"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var captureProductSchema = new Schema({
  _productId: {
    type: Schema.Types.ObjectId,
    rel: 'Product',
    required: true
  },
  _userId: {
    type: Schema.Types.ObjectId,
    rel: 'User',
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  price: Number,
  total: Number
});

var CaptureProduct = _mongoose.default.model('CaptureProduct', captureProductSchema);

var _default = CaptureProduct;
exports.default = _default;