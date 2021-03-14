const express = require('express');
const multer = require('multer');

const chatHandler = require('../handlers/chatHandler');
const { passport_jwt, authenticate } = require('../utils/passport-jwt');
const validator = require('../utils/validator');

// passport use JWT
passport_jwt();

const upload = multer();

const router = express.Router();

/*********************
 **  route: /user  ***
 *********************/

router.get('/chat', authenticate, chatHandler.getRooms);

router.get('/chat/:roomID/messages', authenticate, chatHandler.getMessages);

router.post('/chat', authenticate, chatHandler.addRoom); // add chat by ID

router.post('/chat-add-member', authenticate, chatHandler.addMember); // add chat member]

module.exports = router;
