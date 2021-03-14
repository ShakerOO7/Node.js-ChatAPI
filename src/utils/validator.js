const chalk = require('chalk');
const { body, validationResult } = require('express-validator');
const errorCodes = require('./constatns/errorCodes');
const Exception = require('./exception');

const emailChain = body('email', 'Please enter a valid email')
  .trim()
  .isEmail()
  .trim()
  .normalizeEmail()
  .bail();

const usernameChain = body('username', 'Username must not contain white space')
  .trim()
  .isString()
  .isLength({ min: 4 })
  .custom((value) => {
    return value.indexOf(' ') < 0;
  });

const passwordChain = body(
  'password',
  'Passwors must have 6 characters at least, 1 number at least, 1 uppercase letter at least and 1 lowercase letter at least'
).isStrongPassword({
  minLength: 6,
  minNumbers: 1,
  minLowercase: 1,
  minUppercase: 1,
  minSymbols: 0,
});

const errorHandeler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var exception = new Exception(errorCodes.INVALID_INPUT);
    exception.errors = errors.array();
    console.error(chalk.bold.red('ERROR:') + exception.message);
    return res.status(exception.httpStatus).json({
      error: {
        code: exception.errorCode,
        message: exception.message,
        errors: exception.errors,
      },
    });
  }
  return next();
};

module.exports = {
  signupValidator: [emailChain, usernameChain, passwordChain, errorHandeler],
  loginValidator: [emailChain, errorHandeler],
};
