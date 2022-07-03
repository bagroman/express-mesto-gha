const { ERROR_CODE_EXIST_EMAIL } = require('./error-codes');

class ExistEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_EXIST_EMAIL;
  }
}

module.exports = ExistEmailError;
