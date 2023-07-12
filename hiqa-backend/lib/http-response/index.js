const logger = require('../../src/utils/logger');

const HttpResponseCode = {
  OK: 200,
  WARN_REQUEST: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const Response = {
  success(data = null, message = "") {
    this.status(HttpResponseCode.OK).send({
      status: true,
      data,
      message,
    });
  },
  warn(data = null, message = "") {
    this.status(HttpResponseCode.OK).send({
      status: false,
      data,
      message,
    });
  },
  badRequest(data = null, message = "") {
    this.status(HttpResponseCode.BAD_REQUEST).send({
      status: false,
      data,
      message,
    });
  },
  unauthorized(data = null, message = "") {
    this.status(HttpResponseCode.UNAUTHORIZED).send({
      status: false,
      data,
      message,
    });
  },
  forbidden(data = null, message = "") {
    this.status(HttpResponseCode.FORBIDDEN).send({
      status: false,
      data,
      message,
    });
  },
  notFound(data = null, message = "") {
    this.status(HttpResponseCode.NOT_FOUND).send({
      status: false,
      data,
      message,
    });
  },
  serverError(data = null, message = "", /** @type Error */ err = null) {
    // eslint-disable-next-line no-console
    if (err) console.error("Server-Error: ", err);
    logger.error(`${500} - [ 'Error' ] - ${err}`);
    this.status(HttpResponseCode.SERVER_ERROR).send({
      status: false,
      data,
      message,
      error: err?.message,
    });

  },
};

module.exports.HttpResponseCode = HttpResponseCode;
module.exports.Response = Response;
