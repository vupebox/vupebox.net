"use strict";

var _models = _interopRequireDefault(require("../../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import utilsHelper from '../../helpers/utils';
// import getClientsByUserValidations from '../../validations/user/getClientsByUser';
var _getAllowedData = function _getAllowedData(client, role) {
  var clientAllowed = {};

  if (role === 'employee') {
    clientAllowed.__clientData = {
      companyName: client.__clientData.companyName
    };
  } else {
    return client;
  }

  return clientAllowed;
};

var _validRole = function _validRole(role) {
  return {
    isValid: role === 'admin' || role === 'employee'
  };
};

var _validInputs = function _validInputs(idCount) {
  var n = Number(idCount);
  return !(!idCount || isNaN(n) || n <= 0);
};

var getUserByIdCount =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var idCount, tokenData, role, validationRole, query, client, clientChecked;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            idCount = req.params.idCount;
            tokenData = req.tokenData.data;
            role = tokenData.role; //Validate params input

            if (_validInputs(idCount)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.error('Parámetros inválidos'));

          case 5:
            //Check if has permissions to use resource
            validationRole = _validRole(role);

            if (validationRole.isValid) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.error(403, 'No está autorizado a utilizar este recurso'));

          case 8:
            _context.prev = 8;
            query = {
              idCount: idCount,
              active: true
            };
            _context.next = 12;
            return _models.default.User.findOne(query);

          case 12:
            client = _context.sent;
            clientChecked = _getAllowedData(client, role);

            if (client) {
              res.ok(clientChecked);
            } else {
              res.error(404, 'No existe el cliente');
            }

            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](8);
            res.error('Hubo un error');

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 17]]);
  }));

  return function getUserByIdCount(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = getUserByIdCount;