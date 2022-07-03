const { ERROR_CODE_DEFAULT } = require('./error-codes');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_DEFAULT;
  }
}

module.exports = DefaultError;
