"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _generateResponse = function _generateResponse(products, productsData) {
  var response = [];

  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    for (var j = 0; j < productsData.length; j++) {
      if (String(product._id) === String(productsData[j]._id)) {
        response.push({
          _id: product._id,
          name: product.name,
          total: productsData[j].total
        });
      }
    }
  }

  return response;
};

var _validRole = function _validRole(role, tokenData, userId) {
  return {
    isValid: role === 'client' && tokenData._id === userId
  };
};

var getCaptureData =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var userId, tokenData, role, validationRole, products, total, productsAgg, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = req.params.userId;
            tokenData = req.tokenData.data;
            role = tokenData.role; //Check if has permissions to use resource

            validationRole = _validRole(role, tokenData, userId);

            if (validationRole.isValid) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.error(403, 'No está autorizado a utilizar este recurso'));

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return _models.default.Product.find({});

          case 9:
            products = _context.sent;
            _context.next = 12;
            return _models.default.CaptureProduct.aggregate([{
              $match: {
                _userId: _mongoose.default.Types.ObjectId(String(userId))
              }
            }, {
              $group: {
                _id: null,
                total: {
                  $sum: '$total'
                }
              }
            }]);

          case 12:
            total = _context.sent;
            _context.next = 15;
            return _models.default.CaptureProduct.aggregate([{
              $match: {
                _userId: _mongoose.default.Types.ObjectId(String(userId))
              }
            }, {
              $group: {
                _id: '$_productId',
                total: {
                  $sum: '$value'
                }
              }
            }]);

          case 15:
            productsAgg = _context.sent;
            response = _generateResponse(products, productsAgg);
            res.ok({
              total: total[0].total,
              captures: response
            });
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](6);
            console.log("error ->", _context.t0);
            res.error('Hubo un error al traer las capturas');

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 20]]);
  }));

  return function getCaptureData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = getCaptureData;