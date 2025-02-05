// external imports
const express = require("express");
const { check } = require("express-validator");

// internal imports
const {
  getUsers,
  addUsers,
  removeUser,
} = require("../controller/usersController");
 const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
 const avatarUpload = require("../middlewares/users/avatarUpload");
 const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/usersValidator");

 const router = express.Router();

// users page
 router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user
 router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUsers
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;