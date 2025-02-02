//external imports 
const express = require('express');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const {check} = require('express-validator')
//internal imports
const {getUsers} = require('../controller/usersController');
const avatarUpload = require('../middlewares/users/avatarUpload');

const router = express.Router();

//users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

//add usesrs
router.post("/", avatarUpload);

module.exports = router;