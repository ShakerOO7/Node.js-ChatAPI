const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Exception = require('../utils/exception');
const userDB = require('../models/user');
const { SALT, SECRET } = require('../utils/constatns/common');
const errorCodes = require('../utils/constatns/errorCodes');

//user service

const getUser = async (username) => {
  const user = await userDB.findOne({ username: username });
  if (!user) {
    throw new Exception(errorCodes.NOT_FOUND);
  }
  return user;
};

const signup = async (user) => {
  let result = await userDB.exists({ username: user.username });
  if (result) throw new Exception(errorCodes.USERNAME_NOT_AVAILABLE);

  result = await userDB.exists({ email: user.email });
  if (result) throw new Exception(errorCodes.EMAIL_NOT_AVAILABLE);

  user.password = await bcrypt.hash(user.password, SALT);

  result = await userDB.create(user);

  return result;
};

const updateUser = async (user, userInfo) => {
  const result = await userDB.findById(user._id);
  if (!result) throw new Exception(errorCodes.NOT_FOUND);
  if (userInfo.username) {
    if (!(await userDB.exists({ username: userInfo.username })))
      result.username = userInfo.username;
    else throw new Exception(errorCodes.USERNAME_NOT_AVAILABLE);
  }
  if (userInfo.password) {
    result.password = await bcrypt.hash(userInfo.password, SALT);
  }
  await result.save();
  return result;
};

const deleteUser = async (user) => {
  const exists = await userDB.exists({ _id: user._id });
  if (!exists) throw new Exception(errorCodes.NOT_FOUND);
  await userDB.findByIdAndDelete(user._id);
};

const login = async (user) => {
  const email = user.email;
  const pw = user.password;
  const userResult = await userDB.findOne({ email: email });
  if (userResult) {
    let result = await bcrypt.compare(pw, userResult.password);
    if (result) {
      const payload = {
        _id: userResult._id,
        email: userResult.email,
        username: userResult.username,
      };
      const token = jwt.sign(payload, SECRET);
      return {
        message: 'Auth success',
        user: userResult,
        token: token,
      };
    } else {
      throw new Exception(errorCodes.UNAUTHORIZED);
    }
  } else {
    throw new Exception(errorCodes.UNAUTHORIZED);
  }
};

const getImage = async (id) => {
  const userResult = await userDB.findById(id);
  if (!userResult) {
    throw new Exception(errorCodes.NOT_FOUND);
  }
  return userResult.image;
};

module.exports = {
  getUser: getUser,
  signup: signup,
  updateUser: updateUser,
  deleteUser: deleteUser,
  login: login,
  getImage: getImage,
};
