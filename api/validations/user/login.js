"use strict";

var _utils = _interopRequireDefault(require("../../helpers/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cacheHelper from '../../helpers/cache';
var login = function login(user) {
  var responseObject = {
    isValid: true,
    validations: []
  };
  var email = user.email,
      password = user.password;

  if (!email || typeof email !== 'string' || !email.trim() || !_utils.default.validateEmail(email)) {
    responseObject.validations.push('El email no es válido');
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    responseObject.validations.push('El password no es correcto');
  } //Check if has validations, if has more than 0, then its not valid


  if (responseObject.validations.length) {
    responseObject.isValid = false;
  }

  return responseObject;
};

module.exports = login;