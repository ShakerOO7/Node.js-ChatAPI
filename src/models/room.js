const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'user' }],

  messages: [{ type: Schema.Types.ObjectId, ref: 'message' }],
});

roomSchema.methods.addMessage = function (msgID) {
  this.messages.push(msgID);
  return this.save();
};

roomSchema.methods.addMember = function (userID) {
  if (this.participants.includes(userID)) return this;
  this.participants.push(userID);
  return this.save();
};

const model = new mongoose.model('room', roomSchema, 'rooms');

module.exports = model;
