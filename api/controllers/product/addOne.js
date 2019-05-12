"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

var _addOne = _interopRequireDefault(require("../../validations/product/addOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _validRole = function _validRole(role) {
  return {
    isValid: role === 'admin'
  };
};

var _sanitize = function _sanitize(product) {
  var newData = {};
  if (product.hasOwnProperty('name')) newData.name = _utils.default.removeInternalWhiteSpaces(product.name.trim());
  if (product.hasOwnProperty('price')) newData.price = Number(product.price);
  return newData;
};

var addOne =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var tokenData, role, validations, validationRole, sanitizedProduct, product, createdProduct;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenData = req.tokenData.data;
            role = tokenData.role; //Check input values are valid

            validations = (0, _addOne.default)(req.body);

            if (validations.isValid) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.error(validations.validations[0]));

          case 5:
            //Check if has permissions to use resource
            validationRole = _validRole(role);

            if (validationRole.isValid) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.error(403, 'No está autorizado a utilizar este recurso'));

          case 8:
            //ADD
            sanitizedProduct = _sanitize(req.body);
            sanitizedProduct.lastUpdate = new Date();
            _context.prev = 10;
            product = new _models.default.Product(sanitizedProduct);
            _context.next = 14;
            return product.save();

          case 14:
            createdProduct = _context.sent;
            res.ok(createdProduct);
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](10);
            res.error('Hubo un error al agregar el usuario');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 18]]);
  }));

  return function addOne(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = addOne;