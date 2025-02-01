//external imports 
const express = require('express');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
//internal imports
const {getUsers} = require('../controller/usersController')

const router = express.Router();

//login page
router.get("/", decorateHtmlResponse("Users"), getUsers);

module.exports = router;