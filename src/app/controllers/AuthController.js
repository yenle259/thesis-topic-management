const User = require('../models/User');
const bcrypt = require('bcrypt');

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { studentId: '', password: '' };

    //duplicate err code 11000
    if (err.code === 11000) {
        errors.studentId = "StudentId is already existed"
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(properties.message);
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }
    return errors;
}

class AuthController {

    // [GET] /auth
    login(req, res) {
        res.send('Login Get!!');
    }

    // [POST] /auth/login
    handleLoginActions(req, res) {
        const { studentId, password } = req.body;
        console.log(studentId);

        res.send('Login Post!!');
    }

    // [POST] /auth/signup
    async handleSignupActions(req, res) {
        const { studentId, password } = req.body;
        try {
            const user = await User.create({ studentId, password });
            res.status(201).json(user);
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }
}

module.exports = new AuthController();
