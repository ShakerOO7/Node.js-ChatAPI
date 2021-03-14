const roomDB = require('../models/room');
const userDB = require('../models/user');
const errorCodes = require('../utils/constatns/errorCodes');
const Exception = require('../utils/exception');

// chat service

const addRoom = async (participants) => {
  let room = await roomDB.create({ participants: participants });
  await participants.forEach(async (userID) => {
    const user = await userDB.findById(userID);
    if (!user) {
      throw new Exception(errorCodes.NOT_FOUND);
    }
    user.addToRoom(room._id);
  });
  return room;
};

const getRooms = async (userID) => {
  const rooms = await userDB.findById(userID, ['rooms']).populate('rooms');
  return rooms;
};

const getMessages = async (roomID, page, limit) => {
  const skip = (page - 1) * limit;
  const messages = await roomDB
    .findById(roomID)
    .select({ messages: 1, participants: 0, _id: 0, __v: 0 })
    .slice('messages', [parseInt(skip), parseInt(limit)])
    .populate('messages');
  if (!messages) throw new Exception(errorCodes.NOT_FOUND);
  return messages; // TODO next page
};

const addMember = async (userID, roomID) => {
  const user = await userDB.findById(userID);
  const room = await roomDB.findById(roomID);
  if (!user || !room) throw new Exception(errorCodes.NOT_FOUND);
  user.addToRoom(roomID);
  room.addMember(userID);
};

module.exports = {
  addRoom,
  getRooms,
  addMember,
  getMessages,
};
