const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    discriminatorKey: 'kind',
  }
);

const baseModel = new mongoose.model('message', messageSchema, 'messages');

// 2 2types of messages

const textSchema = new Schema({
  data: {
    type: String,
    required: true,
  },
});

const textModelDB = baseModel.discriminator('text', textSchema);

const fileSchema = new Schema({
  data: {
    type: Buffer,
    required: true,
  },
});

const fileModelDB = baseModel.discriminator('file', fileSchema);

module.exports = { textModelDB, fileModelDB };
