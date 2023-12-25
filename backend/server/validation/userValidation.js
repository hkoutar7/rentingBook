const Joi = require("joi");

function registeredUser (obj) {

    const schemaRegister = Joi.object({
        firstName: Joi.string().trim().pattern(/^[a-zA-Z]{1,50}$/i).required(),
        lastName: Joi.string().trim().pattern(/^[a-zA-Z]{1,50}$/i).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/i).required(),
    });

    return schemaRegister.validate(obj);
}

function loginUser (obj) {

    const schemaLogin = Joi.object({
        email: Joi.string().trim().email().required(),
        password: Joi.string().required(),
    });

    return schemaLogin.validate(obj);
}

function updateUser (obj) {

    const schemaUpdateUser = Joi.object({
        firstName: Joi.string().trim().pattern(/^[a-zA-Z]{1,50}$/i),
        lastName: Joi.string().trim().pattern(/^[a-zA-Z]{1,50}$/i),
    });

    return schemaUpdateUser.validate(obj);
}


module.exports = {
    registeredUser,
    loginUser,
    updateUser,
};