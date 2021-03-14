const express = require('express');
const multer = require('multer');

const userHandler = require('../handlers/userHnadler');
const { passport_jwt, authenticate } = require('../utils/passport-jwt');
const validator = require('../utils/validator');

// passport use JWT
passport_jwt();

const upload = multer();

const router = express.Router();

/*********************
 **  route: /user  ***
 *********************/

router.get('/account/:username', authenticate, userHandler.getUser); // get user by username

router.get('/image/:id', userHandler.getImage);

router.post(
  '/account',
  upload.single('image'),
  validator.signupValidator,
  userHandler.signup
); // add new user

router.post('/login', userHandler.login);

router.put('/account', authenticate, userHandler.updateUser); // update username, password, image

router.delete('/account', authenticate, userHandler.deleteUser); // delete user

module.exports = router;
