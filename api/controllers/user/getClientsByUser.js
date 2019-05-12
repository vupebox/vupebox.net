"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import getClientsByUserValidations from '../../validations/user/getClientsByUser';
var _validRole = function _validRole(role, tokenData, userId) {
  return {
    isValid: role === 'admin' && tokenData._id === userId
  };
};

var _validInputs = function _validInputs(userId) {
  return !(!userId || !_utils.default.isMongooseId(userId));
};

var getClientsByUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var userId, tokenData, role, validationRole, query, clients;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.params.userId;
            tokenData = req.tokenData.data;
            role = tokenData.role; //Validate params input

            if (_validInputs(userId)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.error('Parámetros inválidos'));

          case 5:
            //Check if has permissions to use resource
            validationRole = _validRole(role, tokenData, userId);

            if (validationRole.isValid) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.error(403, 'No está autorizado a utilizar este recurso'));

          case 8:
            _context.prev = 8;
            query = {
              _creator: userId,
              active: true
            };
            _context.next = 12;
            return _models.default.User.find(query).sort({
              idCount: 1
            });

          case 12:
            clients = _context.sent;

            if (clients) {
              res.ok(clients);
            } else {
              res.error(404, 'No existe');
            }

            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](8);
            res.error('Hubo un error');

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 16]]);
  }));

  return function getClientsByUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = getClientsByUser;