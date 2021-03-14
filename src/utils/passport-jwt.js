const { Strategy, ExtractJwt } = require('passport-jwt');
const passport = require('passport');

const User = require('../models/user');
const { SECRET } = require('./constatns/common');
const Exception = require('./exception');
const errorCodes = require('./constatns/errorCodes');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

const passport_cb = async (jwt_payload, done) => {
  const user = await User.findById(jwt_payload._id);
  if (!user) {
    const exception = new Exception(errorCodes.UNAUTHORIZED);
    return done(exception, false);
  }
  return done(null, user);
};

const strategy = new Strategy(opts, passport_cb);

module.exports = {
  passport_jwt: () => passport.use(strategy),
  authenticate: passport.authenticate('jwt', { session: false }),
};
