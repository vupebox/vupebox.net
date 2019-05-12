"use strict";

/**
 * Returns 401 in case that token is not valid
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
var authorization = function authorization(req, res, next) {
  if (!req.tokenData || !req.tokenData.isValid) {
    res.error(401, 'La sesión ha expirado');
  } else {
    next();
  }
};

module.exports = function () {
  return authorization;
};