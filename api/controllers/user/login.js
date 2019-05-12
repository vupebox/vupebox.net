"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

var _jwt = _interopRequireDefault(require("../../helpers/jwt"));

var _login = _interopRequireDefault(require("../../validations/user/login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _compareHash = function _compareHash(password, hash) {
  return _utils.default.compareHashSync(password, hash);
};
/**
 * Check if user exists on database, if exists then compare Hash
 * @param {Object} body 
 */


var _checkUserDb =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(body) {
    var email, password, query, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = body.email, password = body.password;
            query = {
              email: email
            };
            _context.prev = 2;
            _context.next = 5;
            return _models.default.User.findOne(query);

          case 5:
            user = _context.sent;

            if (user) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", {
              exists: false,
              error: 'Usuario o password incorrectos'
            });

          case 10:
            return _context.abrupt("return", _compareHash(password, user.password) ? {
              exists: true,
              user: user
            } : {
              exists: false,
              error: 'Usuario o password incorrectos'
            });

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", {
              exists: false,
              error: 'Hubo un error al loguearse'
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 13]]);
  }));

  return function _checkUserDb(_x) {
    return _ref.apply(this, arguments);
  };
}();

var login =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var validations, checkedUser, _checkedUser$user, _id, email, role, name, active, token, user;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //Check input values are valid
            validations = (0, _login.default)(req.body);

            if (validations.isValid) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.error(validations.validations[0]));

          case 3:
            _context2.next = 5;
            return _checkUserDb(req.body);

          case 5:
            checkedUser = _context2.sent;

            if (checkedUser.exists) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.error(checkedUser.error));

          case 8:
            _checkedUser$user = checkedUser.user, _id = _checkedUser$user._id, email = _checkedUser$user.email, role = _checkedUser$user.role, name = _checkedUser$user.name, active = _checkedUser$user.active;

            if (active) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.error('El usuario no esta activo'));

          case 11:
            token = _jwt.default.sign({
              _id: _id,
              email: email,
              role: role
            });
            user = {
              _id: _id,
              email: email,
              token: token,
              role: role,
              name: name
            };
            res.ok(user);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = login;