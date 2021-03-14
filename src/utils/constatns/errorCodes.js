const httpStatus = require('./httpStatus');

module.exports = {
  DEFAULT: {
    code: 1000,
    message: 'Error',
    httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
  },
  USERNAME_NOT_AVAILABLE: {
    code: 1001,
    message: 'Username is not available',
    httpStatus: httpStatus.CONFLICT,
  },
  EMAIL_NOT_AVAILABLE: {
    code: 1002,
    message: 'Email is currently in use',
    httpStatus: httpStatus.CONFLICT,
  },
  UNAUTHORIZED: {
    code: 1003,
    message: 'Authentication failed',
    httpStatus: httpStatus.UNAUTHRORIZED,
  },
  NOT_FOUND: {
    code: 1004,
    message: 'Not found',
    httpStatus: httpStatus.NOT_FOUND,
  },
  INVALID_INPUT: {
    code: 1005,
    message: 'Invalid input',
    httpStatus: httpStatus.UNPROCESSABLE_ENTITY,
  },
};
