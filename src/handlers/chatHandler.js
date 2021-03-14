const chatService = require('../services/chatService');
const httpStatus = require('../utils/constatns/httpStatus');

const addRoom = async (req, res, next) => {
  try {
    /*
     * #swagger.security = [{"apiKeyAuth": []}]
     * #swagger.tags = ['Chats']
     * #swagger.parameters['room'] = {
        in: 'body',
        type: "object",
        description: "Room data",
        schema: { $ref: "#/definitions/addRoom" }
        }
     */
    console.log(req.body);
    const participants = req.body.room.participants;
    const room = await chatService.addRoom(participants);
    res.json(room);
  } catch (error) {
    next(error);
  }
};

const getRooms = async (req, res, next) => {
  try {
    // #swagger.tags = ['Chats']
    // #swagger.security = [{"apiKeyAuth": []}]
    const userID = req.user._id;
    const rooms = await chatService.getRooms(userID);
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    // #swagger.tags = ['Chats']
    const page = req.query.page;
    const limit = req.query.limit;
    const roomID = req.params.roomID;
    const result = await chatService.getMessages(roomID, page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addMember = async (req, res, next) => {
  try {
    // #swagger.tags = ['Chats']
    const userID = req.body.user._id;
    const roomID = req.body.room._id;
    await chatService.addMember(userID, roomID);
    res.send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addRoom,
  getRooms,
  addMember,
  getMessages,
};
