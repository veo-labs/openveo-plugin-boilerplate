'use strict';

/**
 * The list of HTTP errors with, for each error, its associated hexadecimal code and HTTP return code.
 * HTTP errors are sent by {{#crossLinkModule "controllers"}}{{/crossLinkModule}}.
 *
 * @example
 *     var httpErrors = process.require("app/server/httpErrors.js");
 *     console.log(httpErrors.UNKNOWN_ERROR);
 *
 * @module http-errors
 * @main http-errors
 */
module.exports = {

  // General errors
  UNKNOWN_ERROR: {
    code: 0x001,
    httpCode: 500
  },
  PATH_NOT_FOUND: {
    code: 0x002,
    httpCode: 404
  },
  NOT_ALLOWED: {
    code: 0x003,
    httpCode: 403
  }
};