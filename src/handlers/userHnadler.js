const { hash } = require('bcrypt');
const service = require('../services/userService');
const httpStatus = require('../utils/constatns/httpStatus');
const Exception = require('../utils/exception');

const getUser = async (req, res, next) => {
  //  #swagger.tags = ['Account']
  try {
    const username = req.params.username;
    const user = await service.getUser(username);
    res.status(httpStatus.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  // #swagger.tags = ['Account']
  try {
    const user = req.body;
    user.image = req.file.buffer;
    const result = await service.signup(user);
    res.status(httpStatus.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  // #swagger.tags = ['Account']
  try {
    const user = req.user;
    const userInfo = req.body;
    const result = await service.updateUser(user, userInfo);
    res.status(httpStatus.UPDATED).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  // #swagger.tags = ['Account']
  try {
    const user = req.user;
    await service.deleteUser(user);
    res.status(httpStatus.DELETED).send();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  // #swagger.tags = ['Account']
  try {
    const user = req.body;
    const result = await service.login(user);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getImage = async (req, res, next) => {
  // #swagger.tags = ['Account']
  try {
    const id = req.params.id;
    const image = await service.getImage(id);
    res.set('Content-Type', 'image/png');
    res.status(httpStatus.OK).send(image);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser: getUser,
  signup: signup,
  updateUser: updateUser,
  deleteUser: deleteUser,
  login: login,
  getImage: getImage,
};
