"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var captureSchema = new Schema({
  _idCount: {
    //idCount form User model
    type: Number,
    required: true
  },
  _userId: {
    //mongo _id from User model
    type: Schema.Types.ObjectId,
    required: true
  },
  expenditure: {
    type: Number
  },
  concept: {
    type: String
  },
  expenditureCancel: {
    type: Number
  },
  _productsArray: [{
    _productId: {
      type: Schema.Types.ObjectId
    },
    value: Number,
    price: Number
  }]
});

var Capture = _mongoose.default.model('Capture', captureSchema);

var _default = Capture;
exports.default = _default;