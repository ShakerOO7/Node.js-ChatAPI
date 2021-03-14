const chalk = require('chalk');

const httpStatus = require('./constatns/httpStatus');
const errorCodes = require('./constatns/errorCodes');

class Exception extends Error {
  constructor(error) {
    super(error.message);
    this.errorCode = error.code;
    this.httpStatus = error.httpStatus;
  }

  static exceptionHandeler(error, req, res, next) {
    console.error(chalk.bold.red('ERROR:') + error.message);
    console.error(error.stack);
    res.status(error.httpStatus || 500).json({
      error: {
        code: error.errorCode,
        message: error.message,
      },
    });
  }
}

module.exports = Exception;
