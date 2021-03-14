const socketIo = require('socket.io');
const passport = require('passport-jwt.socketio');
const { ExtractJwt } = require('passport-jwt');

const { SECRET } = require('../utils/constatns/common');

// TODO documentation
function init(server) {
  this.io = socketIo(server);
  this.io.use(
    passport.authorize(
      {
        jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
        secretOrKey: SECRET,
      },
      (jwtPayload, done) => {
        done(null, jwtPayload);
      }
    )
  );

  this.io.use((socket, next) => {
    if (socket.handshake.user) socket.user = socket.handshake.user;
    next();
  });

  return this.io;
}

function getIO() {
  if (!this.io) throw Error('Socket.io not init');
  return this.io;
}

module.exports = { init, getIO };
