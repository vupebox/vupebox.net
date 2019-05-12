"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

var _editOne = _interopRequireDefault(require("../../validations/product/editOne"));

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

var _sanitize = function _sanitize(product) {
  var newData = {};
  if (product.hasOwnProperty('name')) newData.name = _utils.default.removeInternalWhiteSpaces(product.name.trim());
  if (product.hasOwnProperty('price')) newData.price = Number(product.price);
  return newData;
};

var _validInputs = function _validInputs(productId) {
  return !(!productId || !_utils.default.isMongooseId(productId));
};

var editOne =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var productId, tokenData, role, validations, validationRole, sanitizedProduct, editedProduct;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            productId = req.params.productId;
            tokenData = req.tokenData.data;
            role = tokenData.role; //Validate params input

            if (_validInputs(productId)) {
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
            sanitizedProduct = _sanitize(req.body);
            sanitizedProduct.lastUpdate = new Date();
            _context2.next = 18;
            return _models.default.Product.findByIdAndUpdate(productId, {
              $set: sanitizedProduct
            });

          case 18:
            editedProduct = _context2.sent;

            if (editedProduct) {
              res.ok(editedProduct._id);
            } else {
              res.error(404, 'El recurso no existe');
            }

            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](13);
            res.error(404, 'Hubo un error');

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[13, 22]]);
  }));

  return function editOne(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = editOne;