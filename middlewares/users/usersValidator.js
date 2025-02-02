const {check} = require('express-validator');

//add user
const addUsersValidators = [
    check("name")
        .isLength({min: 1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: " -"})
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value});
                if(user){
                    throw createError("Email already is use");
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check("mobile")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be a valid Bangladeshi number")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value});
                if(user) {
                    throw createError("Mobile is already use!")
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
        check("passwor")
            .isStrongPassword()
            .withMessage(
                "Password must be at least 8 characters long"
            ),
];

module.exports = {
    addUsersValidators, 
}