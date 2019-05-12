"use strict";

var _utils = _interopRequireDefault(require("../../helpers/utils"));

var _constants = _interopRequireDefault(require("./../../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cacheHelper from '../../helpers/cache';
var signup = function signup(user) {
  var responseObject = {
    isValid: true,
    validations: []
  };
  var email = user.email,
      password = user.password,
      username = user.username,
      role = user.role;

  if (!email || typeof email !== 'string' || !email.trim() || !_utils.default.validateEmail(email)) {
    responseObject.validations.push('El email no es válido');
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    responseObject.validations.push('Password no es válido');
  }

  if (!username || typeof username !== 'string' || !username.trim()) {
    responseObject.validations.push('Nombre de usuario no es válido');
  }

  if (!role || typeof role !== 'string' || !role.trim() || _constants.default.ROLE_TYPES.indexOf(role) < 0) {
    responseObject.validations.push('Rol no es válido');
  } //Check if has validations, if has more than 0, then its not valid


  if (responseObject.validations.length) {
    responseObject.isValid = false;
  }

  return responseObject;
};

module.exports = signup;