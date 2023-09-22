const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

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
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }
    return errors;
}

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'thesis topic manage', {
        expiresIn: maxAge
    });
};

class AuthController {

    // [GET] /auth
    login(req, res) {
        res.cookie('login', false, { maxAge: 1000 * 3 })
        res.send('Login Get!!');
    }

    // [POST] /auth/login
    async handleLoginActions(req, res) {
        const { studentId, password } = req.body;
        try {
            const user = await User.login(studentId, password);
            const token = createToken(user._id);

            res.cookie('access_token', token, {
                httpOnly: false, maxAge: maxAge * 1000
            });

            res.status(200).json({ user: user._id })
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /auth/signup
    async handleSignupActions(req, res) {
        const { studentId, password } = req.body;
        try {
            const user = await User.create({ studentId, password });
            const token = createToken(user._id);

            res.cookie('access_token', token, {
                httpOnly: false, maxAge: maxAge * 1000
            });

            res.status(201).json({ user: user._id });

            res.status(201).json({ user: user._id });
        } catch (err) {
            const errors = handleErrors(err);
            console.log(errors);
            res.status(400).json({ errors });
        }
    }
}

module.exports = new AuthController();
