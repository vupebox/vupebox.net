"use strict";

var _addOne = _interopRequireDefault(require("./addOne"));

var _getClientsByUser = _interopRequireDefault(require("./getClientsByUser"));

var _login = _interopRequireDefault(require("./login"));

var _signup = _interopRequireDefault(require("./signup"));

var _getOne = _interopRequireDefault(require("./getOne"));

var _editOne = _interopRequireDefault(require("./editOne"));

var _deactivateOne = _interopRequireDefault(require("./deactivateOne"));

var _getUserByIdCount = _interopRequireDefault(require("./getUserByIdCount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  addOne: _addOne.default,
  getClientsByUser: _getClientsByUser.default,
  login: _login.default,
  signup: _signup.default,
  getOne: _getOne.default,
  editOne: _editOne.default,
  deactivateOne: _deactivateOne.default,
  getUserByIdCount: _getUserByIdCount.default
};