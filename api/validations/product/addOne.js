"use strict";

var _utils = _interopRequireDefault(require("../../helpers/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addOne = function addOne(product) {
  var responseObject = {
    isValid: true,
    validations: []
  };
  var name = product.name,
      price = product.price;

  if (!name || typeof name !== 'string' || !name.trim()) {
    responseObject.validations.push('El nombre del producto no es válido');
  }

  if (!price || typeof price !== 'number' || isNaN(price)) {
    responseObject.validations.push('El precio no es válido');
  } //Check if has validations, if has more than 0, then its not valid


  if (responseObject.validations.length) {
    responseObject.isValid = false;
  }

  return responseObject;
};

module.exports = addOne;