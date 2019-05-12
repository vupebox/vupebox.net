"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cache = {
  EstateType: {},
  setEstateTypeCache: function setEstateTypeCache() {
    var types = [];
    var isCached = false;

    var addTypeId = function addTypeId(_estateTypeId) {
      types.push(_estateTypeId);
    };

    var getTypes =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var estateTypes;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (isCached) {
                  _context.next = 19;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return _models.default.EstateType.find({});

              case 4:
                estateTypes = _context.sent;

                if (!(estateTypes && estateTypes.length)) {
                  _context.next = 11;
                  break;
                }

                types = estateTypes.map(function (et) {
                  return String(et._id);
                });
                isCached = true;
                return _context.abrupt("return", types);

              case 11:
                return _context.abrupt("return", []);

              case 12:
                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", []);

              case 17:
                _context.next = 20;
                break;

              case 19:
                return _context.abrupt("return", types);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 14]]);
      }));

      return function getTypes() {
        return _ref.apply(this, arguments);
      };
    }();

    return {
      getTypes: getTypes,
      addTypeId: addTypeId,
      isCached: isCached
    };
  },
  State: {},
  setStateCache: function setStateCache() {
    var types = [];
    var isCached = false;

    var addTypeId = function addTypeId(_estateTypeId) {
      types.push(_estateTypeId);
    };

    var getTypes =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var states;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (isCached) {
                  _context2.next = 19;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return _models.default.State.find({});

              case 4:
                states = _context2.sent;

                if (!(states && states.length)) {
                  _context2.next = 11;
                  break;
                }

                types = states.map(function (s) {
                  return String(s._id);
                });
                isCached = true;
                return _context2.abrupt("return", types);

              case 11:
                return _context2.abrupt("return", []);

              case 12:
                _context2.next = 17;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", []);

              case 17:
                _context2.next = 20;
                break;

              case 19:
                return _context2.abrupt("return", types);

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 14]]);
      }));

      return function getTypes() {
        return _ref2.apply(this, arguments);
      };
    }();

    return {
      getTypes: getTypes,
      addTypeId: addTypeId,
      isCached: isCached
    };
  },
  County: {},
  setCountyCache: function setCountyCache() {
    var types = [];
    var isCached = false;

    var addTypeId = function addTypeId(_countyId) {
      types.push(_countyId);
    };

    var getTypes =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var counties;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (isCached) {
                  _context3.next = 19;
                  break;
                }

                _context3.prev = 1;
                _context3.next = 4;
                return _models.default.County.find({});

              case 4:
                counties = _context3.sent;

                if (!(counties && counties.length)) {
                  _context3.next = 11;
                  break;
                }

                types = counties.map(function (c) {
                  return String(c._id);
                });
                isCached = true;
                return _context3.abrupt("return", types);

              case 11:
                return _context3.abrupt("return", []);

              case 12:
                _context3.next = 17;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", []);

              case 17:
                _context3.next = 20;
                break;

              case 19:
                return _context3.abrupt("return", types);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 14]]);
      }));

      return function getTypes() {
        return _ref3.apply(this, arguments);
      };
    }();

    return {
      getTypes: getTypes,
      addTypeId: addTypeId,
      isCached: isCached
    };
  },
  initCache: function initCache() {
    cache.EstateType = cache.setEstateTypeCache();
    cache.State = cache.setStateCache();
    cache.County = cache.setCountyCache();
  }
};
var _default = cache;
exports.default = _default;