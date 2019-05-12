"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import deactivateOneValidations from '../../validations/user/deactivateOne';
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

var _validInputs = function _validInputs(userId) {
  return !(!userId || !_utils.default.isMongooseId(userId));
};

var deactivateOne =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var userId, tokenData, role, validationRole, deactivatedUser;
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
            _context2.next = 7;
            return _validRole(role);

          case 7:
            validationRole = _context2.sent;

            if (validationRole.isValid) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return", res.error(403, 'No está autorizado a utilizar este recurso'));

          case 10:
            _context2.prev = 10;
            _context2.next = 13;
            return _models.default.User.findByIdAndUpdate(userId, {
              $set: {
                active: false
              }
            });

          case 13:
            deactivatedUser = _context2.sent;

            if (deactivatedUser) {
              res.ok(deactivatedUser._id);
            } else {
              res.error(404, 'El recurso no existe');
            }

            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](10);
            res.error(404, 'Hubo un error');

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[10, 17]]);
  }));

  return function deactivateOne(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = deactivateOne;