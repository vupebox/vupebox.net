"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passwordValidator = _interopRequireDefault(require("password-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var encryptSync = function encryptSync(value, saltValue) {
  var salt = _bcryptjs.default.genSaltSync(saltValue || 10);

  var hash = _bcryptjs.default.hashSync(value, salt);

  return hash;
};

var compareHashSync = function compareHashSync(value, hashedValue) {
  return _bcryptjs.default.compareSync(value, hashedValue);
};

var isMongooseId = function isMongooseId(_id) {
  return _mongoose.default.Types.ObjectId.isValid(_id);
};

var compareIds = function compareIds(id1, id2) {
  return String(id1) === String(id2);
};

var isEmptyObject = function isEmptyObject(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
};

var validateEmail = function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var tested = re.test(String(email).toLowerCase());
  return tested;
};

var checkIsValidDateFormat = function checkIsValidDateFormat(date) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    // it is a date
    if (isNaN(date.getTime())) {
      // d.valueOf() could also work
      // date is not valid
      return false;
    } else {
      // date is valid
      return true;
    }
  } else {
    // not a date
    return false;
  }
};

var validatePassword = function validatePassword(password) {
  var schema = new _passwordValidator.default();
  schema.is().min(8) // Minimum length 8
  .is().max(100) // Maximum length 100
  .has().uppercase() // Must have uppercase letters
  .has().lowercase() // Must have lowercase letters
  .has().digits() // Must have digits
  .has().not().spaces(); // Should not have spaces

  return schema.validate(password);
};

var removeInternalWhiteSpaces = function removeInternalWhiteSpaces(string) {
  return string.replace(/\s\s+/g, ' ');
};

module.exports = {
  encryptSync: encryptSync,
  compareHashSync: compareHashSync,
  isMongooseId: isMongooseId,
  compareIds: compareIds,
  isEmptyObject: isEmptyObject,
  validateEmail: validateEmail,
  checkIsValidDateFormat: checkIsValidDateFormat,
  validatePassword: validatePassword,
  removeInternalWhiteSpaces: removeInternalWhiteSpaces
};