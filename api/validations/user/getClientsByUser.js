"use strict";

var _utils = _interopRequireDefault(require("../../helpers/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cacheHelper from '../../helpers/cache';
var getClientsByUser = function getClientsByUser(user) {
  var responseObject = {
    isValid: true,
    validations: []
  }; //Check if has validations, if has more than 0, then its not valid

  if (responseObject.validations.length) {
    responseObject.isValid = false;
  }

  return responseObject;
};

module.exports = getClientsByUser;