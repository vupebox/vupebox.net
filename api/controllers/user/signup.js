"use strict";

var _models = _interopRequireDefault(require("../../models"));

var _utils = _interopRequireDefault(require("../../helpers/utils"));

var _signup = _interopRequireDefault(require("../../validations/user/signup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _sanitize = function _sanitize(user) {
  var newData = {};
  if (user.hasOwnProperty('email')) newData.email = user.email.trim();
  if (user.hasOwnProperty('username')) newData.username = user.username.trim();
  if (user.hasOwnProperty('password')) newData.password = _utils.default.encryptSync(String(user.password).trim());
  if (user.hasOwnProperty('role')) newData.role = user.role.trim();
  return newData;
};

var signup =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var validations, sanitizedUser, user, createdUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //Check input values are valid
            validations = (0, _signup.default)(req.body);

            if (validations.isValid) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.error(validations.validations[0]));

          case 3:
            //ADD
            sanitizedUser = _sanitize(req.body);
            sanitizedUser.idCount = 0;
            _context.prev = 5;
            user = new _models.default.User(sanitizedUser);
            _context.next = 9;
            return user.save();

          case 9:
            createdUser = _context.sent;
            res.ok(createdUser);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](5);
            res.error('Hubo un error');

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 13]]);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = signup;