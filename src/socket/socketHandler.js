const {
  CONNECTION,
  DISCONNECT,
  MESSAGE_FILE,
  MESSAGE_TEXT,
} = require('../utils/constatns/socketEvents.js');
const socketIo = require('./socket.js');
const socketService = require('./socketService.js');

const chalk = require('chalk');

function onConnection() {
  // TODO set user online => emit to all chat the online activity
  const io = socketIo.getIO();
  io.on(CONNECTION, async (socket) => {
    // join user rooms
    try {
      const rooms = await socketService.getrooms(socket.user._id);
      rooms.forEach((room) => {
        socket.join(room.toString());
      });
    } catch (error) {
      console.log(error.message);
      socket.emit('exception', {
        message: error.message,
      });
    }
    // set socket events
    onMessage_text(socket);
    onMessage_file(socket);
    onDisconnect(socket);
    console.log(chalk.yellow('socket connected ' + socket.user._id));
  });
}

function onDisconnect(socket) {
  // TODO set user offline
  socket.on(DISCONNECT, () => {
    delete socket[socket.user.id];
    console.log(chalk.yellow('socket disconnected'));
  });
}

function onMessage_text(socket) {
  const io = socketIo.getIO();
  socket.on(MESSAGE_TEXT, async ({ content, roomID }) => {
    try {
      await socketService.sendMessage_text(content, socket.user._id, roomID);
    } catch (error) {
      console.log(error.message);
      socket.emit('exception', {
        message: error.message,
      });
    }
    io.in(roomID).emit(MESSAGE_TEXT, {
      content: content,
      from: socket.user._id,
    });
  });
}

function onMessage_file(socket) {
  const io = socketIo.getIO();
  socket.on(MESSAGE_FILE, async ({ content, roomID }) => {
    console.log(content);
    try {
      await socketService.sendMessage_file(content, socket.user._id, roomID);
    } catch (error) {
      console.log(error.message);
      socket.emit('exception', {
        message: error.message,
      });
    }
    io.in(roomID).emit(MESSAGE_TEXT, {
      content: content,
      from: socket.user._id,
    });
  });
}

module.exports = {
  onConnection,
};
