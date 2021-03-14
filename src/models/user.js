const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'room',
        unique: true,
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: false,
      transform: function (doc, ret) {
        delete ret.password;
        ret.image = {
          type: 'GET',
          endpoint: `http://${process.env.HOST}/user/image/${ret._id}`,
        };
      },
    },
    toObject: {
      getters: true,
      transform: function (doc, ret) {
        delete ret.password;
        ret.image = {
          type: 'GET',
          endpoint: `http://${process.env.HOST}/user/image/${ret._id}`,
        };
      },
    },
    timestamps: true,
  }
);

UserSchema.methods.addToRoom = function (roomID) {
  if (this.rooms.includes(roomID)) return this;
  this.rooms.push(roomID);
  return this.save();
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
