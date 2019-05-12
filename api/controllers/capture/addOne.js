"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

var _addOne = _interopRequireDefault(require("../../validations/capture/addOne"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _validRole = function _validRole(role) {
  return {
    isValid: role === 'admin' || role === 'employee'
  };
};

var _sanitize = function _sanitize(capture, userData) {
  var newData = {};
  newData._idCount = Number(capture._idCount);
  newData._userId = userData._id;
  if (capture.hasOwnProperty('expenditure')) newData.expenditure = Number(Number(capture.expenditure).toFixed(2));
  if (capture.hasOwnProperty('concept')) newData.concept = _utils.default.removeInternalWhiteSpaces(capture.concept.trim());
  if (capture.hasOwnProperty('expenditureCancel')) newData.expenditureCancel = Number(Number(capture.expenditureCancel).toFixed(2));
  return newData;
};

var _getProductTotals = function _getProductTotals(values) {
  for (var i = 0; i < values.length; i++) {
    values[i].total = Number(values[i].price) * Number(values[i].value);
  }

  return values;
};

var _getProductsArray = function _getProductsArray(values, products) {
  var productsArray = [];

  for (var i = 0; i < values.length; i++) {
    var val = values[i];
    var newProduct = {
      _productId: val._productId,
      value: Number(Number(val.value).toFixed(2))
    };

    for (var j = 0; j < products.length; j++) {
      var product = products[j];

      if (String(val._productId) === String(product._id)) {
        newProduct.price = product.price;
      }
    }

    productsArray.push(newProduct);
  }

  return productsArray;
};

var _getProductFromArray = function _getProductFromArray(_productId, products) {
  for (var i = 0; i < products.length; i++) {
    if (String(_productId) === String(products[i]._id)) {
      return products[i];
    }
  }
};

var _getProductValues = function _getProductValues(selects, _userId, products) {
  var values = [];

  for (var i = 0; i < selects.length; i++) {
    var product = selects[i];

    if (_utils.default.isMongooseId(product._productId)) {
      var existsProduct = -1;

      for (var j = 0; j < values.length; j++) {
        if (String(values[j]._productId) === product._productId) {
          existsProduct = j;
          break;
        }
      }

      if (existsProduct >= 0) {
        if (product.value && typeof product.value == 'string' && !isNaN(Number(product.value)) && Number(product.value) >= 0) {
          values[existsProduct].value = Number(values[existsProduct].value) + Number(Number(product.value).toFixed(2));
        }
      } else {
        if (product.value && typeof product.value == 'string' && !isNaN(Number(product.value)) && Number(product.value) >= 0) {
          values.push({
            _userId: _userId,
            _productId: product._productId,
            value: Number(Number(product.value).toFixed(2)),
            price: _getProductFromArray(product._productId, products).price
          });
        }
      }
    }
  }

  return values;
};

var _getUser =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_idCount) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _models.default.User.findOne({
              idCount: _idCount
            }, 'active');

          case 2:
            user = _context.sent;
            return _context.abrupt("return", user);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function _getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

var addOne =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var tokenData, role, validations, validationRole, userData, session, sanitizedCapture, products, values, valuesWithTotal, captureProducts, _productsArray, capture, createdCapture;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tokenData = req.tokenData.data;
            role = tokenData.role; //Check input values are valid

            validations = (0, _addOne.default)(req.body, role);

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
            _context2.prev = 8;
            _context2.next = 11;
            return _getUser(req.body._idCount);

          case 11:
            userData = _context2.sent;

            if (userData.active) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.error('El usuario no está activo, no puede realizarse la captura'));

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](8);
            return _context2.abrupt("return", res.error('Hubo un error al cargar la captura'));

          case 19:
            session = null;
            sanitizedCapture = _sanitize(req.body, userData);
            _context2.prev = 21;
            _context2.next = 24;
            return _models.default.Product.find();

          case 24:
            products = _context2.sent;
            _context2.next = 27;
            return _mongoose.default.startSession();

          case 27:
            session = _context2.sent;
            session.startTransaction();
            values = _getProductValues(req.body.selects, userData._id, products);
            valuesWithTotal = _getProductTotals(values);
            _context2.next = 33;
            return _models.default.CaptureProduct.insertMany(valuesWithTotal, {
              session: session
            });

          case 33:
            captureProducts = _context2.sent;
            _productsArray = _getProductsArray(values, products);
            sanitizedCapture._productsArray = _productsArray;
            capture = new _models.default.Capture(sanitizedCapture);
            _context2.next = 39;
            return capture.save({
              session: session
            });

          case 39:
            createdCapture = _context2.sent;
            _context2.next = 42;
            return session.commitTransaction();

          case 42:
            res.ok({
              captureProducts: captureProducts,
              createdCapture: createdCapture
            });
            _context2.next = 49;
            break;

          case 45:
            _context2.prev = 45;
            _context2.t1 = _context2["catch"](21);
            session.abortTransaction();
            res.error('Hubo un error al cargar la captura');

          case 49:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[8, 16], [21, 45]]);
  }));

  return function addOne(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = addOne;