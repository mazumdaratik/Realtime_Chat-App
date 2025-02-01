//external imports 
const express = require('express');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
//internal imports
const {getInbox} = require('../controller/inboxController')

const router = express.Router();

//inbox page
router.get("/", decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;