"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Detect if authorization sent on header has a Bearer token valid
 * @param {String} authorization - Token sent on header, must be 'Bearer token....'
 */
var _getToken = function _getToken(authorization) {
  var authSplitted = authorization.split(" ");
  var response = {
    isValid: false
  };

  if (authSplitted[0] === "Bearer") {
    var token = authSplitted[1];
    response.token = token;
    response.isValid = true;
  }

  return response;
};
/**
 * Decode token, return isValid = false if token is invalid
 * @param {String} token - json web token
 */


var _decodeToken = function _decodeToken(token) {
  var response = {
    isValid: false
  };

  try {
    var decoded = _jsonwebtoken.default.verify(token, _config.default.jwtPrivateKey);

    response.isValid = true;
    response.data = decoded;
  } catch (e) {}

  return response;
};
/**
 * Set on var req.tokenData, which is an Object with {hasToken: Boolean, [isValid, data (decoded token)]}
 */


var jwtModule = function jwtModule(req, res, next) {
  var tokenData = {};

  if (req.headers.authorization) {
    var tkn = _getToken(req.headers.authorization);

    if (tkn.isValid) {
      tokenData = _decodeToken(tkn.token);
    } else {
      tokenData.isValid = false;
    }
  } else {
    tokenData.isValid = false;
  }

  req.tokenData = tokenData;
  next();
};

var _default = function _default() {
  return jwtModule;
};

exports.default = _default;