"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _authorization = _interopRequireDefault(require("./middlewares/authorization"));

var _user = _interopRequireDefault(require("./controllers/user"));

var _product = _interopRequireDefault(require("./controllers/product"));

var _capture = _interopRequireDefault(require("./controllers/capture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Middlewares
var routes = (0, _express.default)(); //User routes

routes.post('/user/login', _user.default.login);
routes.post('/user/signup', _user.default.signup);
routes.get('/user/:userId/clients', (0, _authorization.default)(), _user.default.getClientsByUser);
routes.post('/user', (0, _authorization.default)(), _user.default.addOne);
routes.get('/user/:userId', (0, _authorization.default)(), _user.default.getOne);
routes.put('/user/:userId', (0, _authorization.default)(), _user.default.editOne);
routes.post('/user/:userId/deactivate', (0, _authorization.default)(), _user.default.deactivateOne);
routes.get('/user/getUserByIdCount/:idCount', (0, _authorization.default)(), _user.default.getUserByIdCount); //Product routes

routes.get('/product/:productId', (0, _authorization.default)(), _product.default.getOne);
routes.get('/product', (0, _authorization.default)(), _product.default.getAll);
routes.post('/product', (0, _authorization.default)(), _product.default.addOne);
routes.put('/product/:productId', (0, _authorization.default)(), _product.default.editOne); //Capture routes

routes.get('/capture', (0, _authorization.default)(), _capture.default.getAll);
routes.post('/capture', (0, _authorization.default)(), _capture.default.addOne);
routes.get('/capture/:userId/getCaptureData', (0, _authorization.default)(), _capture.default.getCaptureData);
routes.get('/capture/:userId/getExpenditures', (0, _authorization.default)(), _capture.default.getExpenditures);
var _default = routes;
exports.default = _default;