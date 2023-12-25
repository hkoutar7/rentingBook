const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {User} = require("./../models/userModel");
const { registeredUser, loginUser } = require("./../validation/userValidation");

/**
 * @desc   : Register A New User
 * @routes : /api/v1/auth/register
 * @method : POST
 * @access : public
 */

router.post("/register" , async (req, res) => {

    let {firstName, lastName, email, password} = req.body;

    try {
        let { error } = registeredUser(req.body);
        if (error)
            return res.status(409).json({
                statusCode: 409,
                message: error.details[0].message,
            });

        let user = await User.findOne({ email });

        if (user)
            return res.status(400).json({
                    statusCode : 400,
                    message : "User already registered",
                })
        
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt); 
        
        let newUser = new User ({
            firstName,
            lastName,
            email,
            password : hashedPassword,
        });

        let token = null;
        let userRegistered = await newUser.save();

        let userRegisteredRemaining = {
            firstName: userRegistered.firstName,
            lastName: userRegistered.lastName,
            email: userRegistered.email,
            roles: userRegistered.roles,
            avatarImage: userRegistered.avatarImage,
            _id: userRegistered._id,
        };

        res.status(201).json({
            data: { ...userRegisteredRemaining, token },
            statusCode: 201,
            message: "The user've been registered successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            message: "An error occurs while user registration",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while user registration.`);
    }

});

/**
 * @desc   : Login User
 * @routes : /api/v1/auth/login
 * @method : POST
 * @access : public
 */

router.post("/login", async(req, res) => {

    let { email, password } = req.body;

    try {
        let { error } = loginUser(req.body);
        if (error)
            return res.status(409).json({
                statusCode: 409,
                message: error.details[0].message,
            });

        let isExistUser = await User.findOne({ email });
        if (!isExistUser)
            return res.status(400).json({
                statusCode: 400,
                message: "wrong password or email",
            });

        let isPasswordMatched = await bcrypt.compare(password, isExistUser.password);
        if (!isPasswordMatched)
            return res.status(400).json({
                statusCode: 400,
                message: "wrong password or email",
            });

        let token = null;
        let userLogin = {
            _id: isExistUser._id,
            firstName: isExistUser.firstName,
            lastName: isExistUser.lastName,
            email: isExistUser.email,
            roles: isExistUser.roles,
            avatarImage: isExistUser.avatarImage,
        };

        return res.status(200).json({
            data: { ...userLogin, token },
            statusCode: 200,
            message: "user logged successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurs while user Login",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while user login.`);
    }
});

module.exports = router;
