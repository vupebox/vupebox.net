"use strict";

var _utils = _interopRequireDefault(require("../../helpers/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addOne = function addOne(user) {
  var responseObject = {
    isValid: true,
    validations: []
  };
  var companyName = user.companyName,
      city = user.city,
      address = user.address,
      phone = user.phone,
      email = user.email,
      contact = user.contact,
      password = user.password,
      password2 = user.password2;

  if (!companyName || typeof companyName !== 'string' || !companyName.trim()) {
    responseObject.validations.push('El nombre de la empresa no es válido');
  }

  if (!city || typeof city !== 'string' || !city.trim()) {
    responseObject.validations.push('La ciudad no es válida');
  }

  if (!address || typeof address !== 'string' || !address.trim()) {
    responseObject.validations.push('La dirección no es válido');
  }

  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    responseObject.validations.push('El teléfono no es válido');
  }

  if (!email || typeof email !== 'string' || !email.trim() || !_utils.default.validateEmail(email)) {
    responseObject.validations.push('El email no es válido');
  }

  if (!contact || typeof contact !== 'string' || !contact.trim()) {
    responseObject.validations.push('El contacto no es válido');
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    responseObject.validations.push('La contraseña no es válida');
  }

  if (!password2 || typeof password2 !== 'string' || !password2.trim()) {
    responseObject.validations.push('La contraseña no es válida');
  }

  if (password !== password2) {
    responseObject.validations.push('Las contraseñas no coinciden');
  } //Check if has validations, if has more than 0, then its not valid


  if (responseObject.validations.length) {
    responseObject.isValid = false;
  }

  return responseObject;
};

module.exports = addOne;