//internal imports
const User = require('../models/people');
//external imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
//get login page
function getLogin(req, res, next) {
    res.render('index');
}

async function login(req, res, next) {
    try {
        const user = await User.findOne({
            $or: [{email: req.body.username}, {mobile: req.body.username}],
        });
        if(user && user._id) {
            const isValidPassword = await bcrypt.compare(
              req.body.password,
              user.password  
            );

            if(isValidPassword){
              //prepare the user object to generate token
              const userObject = {
                username: user.name,
                mobile: user.mobile,
                email: user.email,
                role: 'user'
              };

              //generate token
              const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRY,
              });

              //set cookie
              res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: process.env.JWT_EXPIRY,
                httpOnly: true,
                signed: true,
              });

              //set loggeg in user local identification
              res.locals.loggedInUser = userObject;

              res.render('inbox');
            } else {
                throw createError("Login failed! please try again");
            }
        } else {
            throw createError("Login failed! please try again");
        }
    } catch (err){
        res.render('index', {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                }
            }
        });
    }
}

module.exports = {
    getLogin,
    login,
}