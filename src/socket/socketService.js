const userDB = require('../models/user');
const roomDB = require('../models/room');
const { textModelDB, fileModelDB } = require('../models/message');
const Exception = require('../utils/exception');
const errorCodes = require('../utils/constatns/errorCodes');

const sendMessage_text = async (content, fromID, toID) => {
  const msg = await textModelDB.create({
    date: Date.now(),
    sender: fromID,
    data: content,
  });

  const room = await roomDB.findById(toID);
  if (!room) throw new Exception(errorCodes.NOT_FOUND);
  await room.addMessage(msg._id);
};

const sendMessage_file = async (content, fromID, toID) => {
  const msg = await fileModelDB.create({
    date: Date.now(),
    sender: fromID,
    data: content,
  });

  const room = await roomDB.findById(toID);
  if (!room) throw new Exception(errorCodes.NOT_FOUND);
  await room.addMessage(msg._id);
};

const getrooms = async (userID) => {
  const { rooms } = await userDB.findById(userID, 'rooms');
  if (!rooms) throw new Exception(errorCodes.NOT_FOUND);
  return rooms;
};

module.exports = {
  sendMessage_text,
  sendMessage_file,
  getrooms,
};
