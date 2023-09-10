const User = require('../models/User');

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
            console.log(err);
            res.status(400).send('user not created');
        }
    }
}

module.exports = new AuthController();
