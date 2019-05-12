"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _jwtMiddleware = _interopRequireDefault(require("./middlewares/jwtMiddleware"));

var _responseMiddleware = _interopRequireDefault(require("./middlewares/responseMiddleware"));

var _routes = _interopRequireDefault(require("./routes"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Middleware imports
//Init mongoose with Mongo Atlas
_mongoose.default.connect(_config.default.mongo, {
  useNewUrlParser: true
}, function (err, res) {
  if (err) return console.log("Error on mongodb connect", err);
  console.log("Connected to mongo");
});

var app = (0, _express.default)();

var server = require('http').createServer(app); //Just for development


app.use((0, _cors.default)());
app.use(_express.default.static(_path.default.resolve(__dirname, _config.default.staticFolder)));
app.use(_express.default.static(_path.default.resolve(__dirname, _config.default.adminFolder))); // Middlewares

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use((0, _jwtMiddleware.default)());
app.use((0, _responseMiddleware.default)()); // Api routes

app.use('/api', _routes.default);
var _default = server;
exports.default = _default;