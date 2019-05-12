"use strict";

var _signup = _interopRequireDefault(require("./signup"));

var _login = _interopRequireDefault(require("./login"));

var _addOne = _interopRequireDefault(require("./addOne"));

var _getClientsByUser = _interopRequireDefault(require("./getClientsByUser"));

var _editOne = _interopRequireDefault(require("./editOne"));

var _deactivateOne = _interopRequireDefault(require("./deactivateOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  signup: _signup.default,
  login: _login.default,
  addOne: _addOne.default,
  getClientsByUser: _getClientsByUser.default,
  editOne: _editOne.default,
  deactivateOne: _deactivateOne.default
};