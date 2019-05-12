"use strict";

require("@babel/polyfill");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = 3000;

_app.default.listen(port, function () {
  console.log("Escuchando en el puerto " + port);
});