"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _validRole = function _validRole(role) {
  return {
    isValid: role === 'admin'
  };
};

var _validInputs = function _validInputs(productId) {
  return !(!productId || !_utils.default.isMongooseId(productId));
};

var getOne =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var productId, tokenData, role, validationRole, product;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            productId = req.params.productId;
            tokenData = req.tokenData.data;
            role = tokenData.role; //Validate params input

            if (_validInputs(productId)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.error('Parámetros inválidos'));

          case 5:
            //Check if has permissions to use resource
            validationRole = _validRole(role
            /*, tokenData, paramId*/
            );

            if (validationRole.isValid) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.error(403, 'No está autorizado a utilizar este recurso'));

          case 8:
            _context.prev = 8;
            _context.next = 11;
            return _models.default.Product.findById(productId);

          case 11:
            product = _context.sent;

            if (product) {
              res.ok(product);
            } else {
              res.error(404, 'No existe');
            }

            _context.next = 18;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](8);
            res.error('Hubo un error');

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 15]]);
  }));

  return function getOne(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = getOne;