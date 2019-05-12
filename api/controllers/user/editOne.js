"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

var _editOne = _interopRequireDefault(require("../../validations/user/editOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _validRole =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(role) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", {
              isValid: role === 'admin'
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function _validRole(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _sanitize = function _sanitize(user) {
  var __clientData = {};
  if (user.hasOwnProperty('companyName')) __clientData.companyName = _utils.default.removeInternalWhiteSpaces(user.companyName.trim());
  if (user.hasOwnProperty('city')) __clientData.city = _utils.default.removeInternalWhiteSpaces(user.city.trim());
  if (user.hasOwnProperty('address')) __clientData.address = _utils.default.removeInternalWhiteSpaces(user.address.trim());
  if (user.hasOwnProperty('phone')) __clientData.phone = _utils.default.removeInternalWhiteSpaces(user.phone.trim());
  if (user.hasOwnProperty('contact')) __clientData.contact = _utils.default.removeInternalWhiteSpaces(user.contact.trim());
  var newData = {
    email: user.email.trim(),
    __clientData: __clientData
  };
  return newData;
};

var _validInputs = function _validInputs(userId) {
  return !(!userId || !_utils.default.isMongooseId(userId));
};

var editOne =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var userId, tokenData, role, validations, validationRole, sanitizedUser, editedUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.params.userId;
            tokenData = req.tokenData.data;
            role = tokenData.role; //Validate params input

            if (_validInputs(userId)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.error('Parámetros inválidos'));

          case 5:
            //Check input values are valid
            validations = (0, _editOne.default)(req.body);

            if (validations.isValid) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.error(validations.validations[0]));

          case 8:
            _context2.next = 10;
            return _validRole(role);

          case 10:
            validationRole = _context2.sent;

            if (validationRole.isValid) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.error(403, 'No está autorizado a utilizar este recurso'));

          case 13:
            _context2.prev = 13;
            sanitizedUser = _sanitize(req.body);
            _context2.next = 17;
            return _models.default.User.findByIdAndUpdate(userId, {
              $set: sanitizedUser
            });

          case 17:
            editedUser = _context2.sent;

            if (editedUser) {
              res.ok(editedUser._id);
            } else {
              res.error(404, 'El recurso no existe');
            }

            _context2.next = 24;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](13);
            res.error(404, 'Hubo un error');

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[13, 21]]);
  }));

  return function editOne(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = editOne;