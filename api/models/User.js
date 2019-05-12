"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _constants = _interopRequireDefault(require("./../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var userSchema = new Schema({
  idCount: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  role: {
    type: String,
    enum: _constants.default.ROLE_TYPES,
    required: true
  },
  //for 'client' rol
  __clientData: {
    companyName: String,
    city: String,
    address: String,
    phone: String,
    contact: String
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createAt: {
    type: Date
  }
});

var User = _mongoose.default.model('User', userSchema);

var _default = User;
exports.default = _default;