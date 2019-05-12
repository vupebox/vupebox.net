"use strict";

var _utils = _interopRequireDefault(require("../../helpers/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addOne = function addOne(capture, role) {
  var responseObject = {
    isValid: true,
    validations: []
  };
  var _idCount = capture._idCount,
      selects = capture.selects,
      expenditure = capture.expenditure,
      concept = capture.concept,
      expenditureCancel = capture.expenditureCancel;

  if (!_idCount || typeof _idCount !== 'number' || isNaN(_idCount)) {
    responseObject.validations.push('El id del usuario no es válido');
  }

  if (!selects || !Array.isArray(selects)) {
    responseObject.validations.push('Los productos no son válidos');
  }

  for (var i = 0; i < selects.length; i++) {
    var product = selects[i];

    if (_utils.default.isMongooseId(product._productId)) {
      if (!product.value || typeof product.value !== 'string' || isNaN(Number(product.value)) || Number(product.value) < 0) {
        responseObject.validations.push('Los productos seleccionados no tienen valores válidos');
        break;
      }
    }
  }

  if (role === 'admin') {
    if (capture.hasOwnProperty('expenditure')) {
      if (typeof expenditure !== 'number' || isNaN(expenditure) || expenditure < 0) {
        responseObject.validations.push('El gasto no es válido');
      }
    }

    if (capture.hasOwnProperty('concept') && concept) {
      if (typeof concept !== 'string' || !concept.trim()) {
        responseObject.validations.push('El concepto no es válido');
      }
    }

    if (capture.hasOwnProperty('expenditureCancel')) {
      if (typeof expenditureCancel !== 'number' || isNaN(expenditureCancel) || expenditureCancel < 0) {
        responseObject.validations.push('La cancelación de gasto no es válida');
      }
    }
  } //Check if has validations, if has more than 0, then its not valid


  if (responseObject.validations.length) {
    responseObject.isValid = false;
  }

  return responseObject;
};

module.exports = addOne;