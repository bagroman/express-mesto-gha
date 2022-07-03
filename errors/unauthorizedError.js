const { ERROR_CODE_UNAUTHORIZED } = require('./error-codes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
