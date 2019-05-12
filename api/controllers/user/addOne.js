"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

var _addOne = _interopRequireDefault(require("../../validations/user/addOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _getLastCountClients =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var count;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _models.default.User.count({
              role: 'client'
            });

          case 3:
            count = _context.sent;
            return _context.abrupt("return", count);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", -1);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function _getLastCountClients() {
    return _ref.apply(this, arguments);
  };
}();

var _validRole = function _validRole(role) {
  return {
    isValid: role === 'admin'
  };
};

var _sanitize = function _sanitize(user) {
  var __clientData = {};
  if (user.hasOwnProperty('companyName')) __clientData.companyName = _utils.default.removeInternalWhiteSpaces(user.companyName.trim());
  if (user.hasOwnProperty('city')) __clientData.city = _utils.default.removeInternalWhiteSpaces(user.city.trim());
  if (user.hasOwnProperty('address')) __clientData.address = _utils.default.removeInternalWhiteSpaces(user.address.trim());
  if (user.hasOwnProperty('phone')) __clientData.phone = _utils.default.removeInternalWhiteSpaces(user.phone.trim());
  if (user.hasOwnProperty('contact')) __clientData.contact = _utils.default.removeInternalWhiteSpaces(user.contact.trim());
  var newData = {
    email: user.email.trim(),
    password: _utils.default.encryptSync(String(user.password).trim()),
    __clientData: __clientData
  };
  return newData;
};

var addOne =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var tokenData, role, validations, validationRole, sanitizedUser, countClients, user, createdUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tokenData = req.tokenData.data;
            role = tokenData.role; //Check input values are valid

            validations = (0, _addOne.default)(req.body);

            if (validations.isValid) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", res.error(validations.validations[0]));

          case 5:
            //Check if has permissions to use resource
            validationRole = _validRole(role);

            if (validationRole.isValid) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.error(403, 'No está autorizado a utilizar este recurso'));

          case 8:
            //ADD
            sanitizedUser = _sanitize(req.body);
            sanitizedUser.createAt = new Date();
            sanitizedUser.role = 'client';
            sanitizedUser._creator = _mongoose.default.Types.ObjectId(tokenData._id);
            _context2.prev = 12;
            _context2.next = 15;
            return _getLastCountClients();

          case 15:
            countClients = _context2.sent;
            sanitizedUser.idCount = countClients + 1;
            user = new _models.default.User(sanitizedUser);
            _context2.next = 20;
            return user.save();

          case 20:
            createdUser = _context2.sent;
            res.ok(createdUser);
            _context2.next = 27;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](12);
            res.error('Hubo un error al agregar el usuario');

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[12, 24]]);
  }));

  return function addOne(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = addOne;