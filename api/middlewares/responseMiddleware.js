"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Middleware that adds 2 functions to res object of express
 * Function 1: res.ok(status), receives 1 parameter and sent a 200 response with object
 * Function 2: res.error(status, message, data) receives status and sent a error response
 */
var globalResponse;
/**
 * Receives 1 parameter and sent a 200 response with body
 * @param {Object} body 
 */

var okFunction = function okFunction(body) {
  globalResponse.status(200).json({
    data: body
  });
  globalResponse.end();
};
/**
 * Sent error response, if has a status (example 400 or 500) sent with that code and then you could sent a message and a data (as optional data)
 * If status is a String then by default function sent a 400 with the value of status argument as a message, and message argument as data
 * @param {Number} status 
 * @param {String} message 
 * @param {Object} data 
 */


var errorFunction = function errorFunction(status, message, data) {
  if (typeof status === 'string') {
    //Example res.error('This is the error message...', [...]);
    globalResponse.status(400).json({
      errorMessage: status,
      data: message
    });
  } else {
    if (status.hasOwnProperty('message') && status.hasOwnProperty('code')) {
      globalResponse.status(400).json(status);
    } else {
      //Example res.error(404, 'This is the error message...', [])
      globalResponse.status(status).json({
        errorMessage: message || '',
        data: data
      });
    }
  }
};

var responseModule = function responseModule(req, res, next) {
  res.ok = okFunction;
  res.error = errorFunction;
  globalResponse = res;
  next();
};

var _default = function _default() {
  return responseModule;
};

exports.default = _default;