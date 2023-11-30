const Lecturer = require('../models/Lecturer');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');

const { resetPasswordEmailMessage } = require('../../utils/resetPasswordEmailMessage')

//transporter to send mail
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ // config mail server
    service: 'Gmail',
    auth: {
        user: 'htqldt@gmail.com',
        pass: 'xewy omrj tars ywkv'
    }
});

//handle error if failed, err.code sth is undefined
const handleErrors = (err) => {
    console.log(err.message, err.code);
    //err.code usually is undefined
    let errors = { userId: '', password: '' };

    //duplicate err code 11000
    if (err.code === 11000) {
        errors.userId = "User ID is already existed"
    }

    //invalid user
    if (err.message.includes('Invalid User ID')) {
        errors.userId = "Mã số người dùng không tồn tại";
    }

    //invalid user
    if (err.message.includes('Incorrect password')) {
        errors.password = "Mật khẩu người dùng không chính xác";
    }

    //invalid user
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
        console.log(errors);
    }
    return errors;
}
//second - 3 days
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
        const { userId, password } = req.body;
        try {
            const user = await Lecturer.login(userId, password);
            console.log(user);
            const token = createToken(user._id);

            res.cookie('access_token', token, {
                httpOnly: false, maxAge: maxAge * 1000
            });

            res.status(200).json({ user, access_token: token })
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [POST] /auth/login
    async handleLogin(req, res) {
        const { userId, password } = req.body;
        try {
            const user = handleAuth(userId, password);

            // create token
            const token = createToken(user._id);
            res.cookie('access_token', token, {
                httpOnly: false, maxAge: maxAge * 1000
            });

            res.status(200).json({ user, access_token: token })
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [GET] /auth/logout
    logout(req, res) {
        res.cookie('access_token', '', { maxAge: 1 })
        res.send('Logout Get!!');
    }

    // [POST] /auth/signup
    async handleSignupActions(req, res) {
        const { userId, password, name, email, role, registerModule } = req.body;
        try {
            const user = await Lecturer.create({ userId, password, name, email, role });
            const token = createToken(user._id);
            const userObject = handleUserObjectByRole(role, user._id, registerModule);

            res.cookie('access_token', token, {
                httpOnly: false, maxAge: maxAge * 1000
            });

            res.status(201).json({ user: user._id, userObject });
        } catch (err) {
            const errors = handleErrors(err);
            console.log(errors);
            res.status(400).json({ errors });
        }
    }

    // [POST] /auth/student/signup
    async handleStudentSignup(req, res) {
        const { userId, password, name, email, moduleType } = req.body;
        try {
            const registerModule = {
                semester: '6526d24c7547ab02d497a7a4',
                moduleType
            }
            const student = await Student.create({ userId, password, name, email, registerModule });

            res.status(201).json({ student: student._id });
        } catch (err) {
            const errors = handleErrors(err);
            console.log(errors);
            res.status(400).json({ errors });
        }
    }

    // [POST] /auth/lecturer/signup
    async handleLecturerSignup(req, res) {
        const { userId, password, name, email, role } = req.body;
        try {
            const lecturer = await Lecturer.create({ userId, password, name, email, role });

            res.status(201).json({ lecturer: lecturer._id });
        } catch (err) {
            const errors = handleErrors(err);
            console.log(errors);
            res.status(400).json({ errors });
        }
    }

    // [POST] /auth/lecturer/signup
    async handleUserSignup(req, res) {
        const { userId, password, name, email, role } = req.body;
        try {
            const user = await Lecturer.create({ userId, password, name, email, role });

            res.status(201).json({ user });
        } catch (err) {
            const errors = handleErrors(err);
            console.log(errors);
            res.status(400).json({ errors });
        }
    }

    // [GET] /auth/reset/:userId -> get Infomation of user by userId
    async getUserInfoByUserId(req, res, next) {
        const userId = req.params.id;
        console.log(userId)

        let user;
        try {
            user = await Student.findOne({ userId });
            if (!user) {
                user = await Lecturer.findOne({ userId });
            }
            console.log(user)
            res.status(201).json({ user });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

    // [PUT] /auth/reset -> get Infomation of user by userId
    async resetPassword(req, res, next) {
        const userId = req.params.id;
        let user;
        try {
            const newPassword = generator.generate({
                length: 10,
                numbers: true,
            });
            const salt = bcrypt.genSaltSync();
            const hashPassword = bcrypt.hashSync(newPassword, salt);

            user = await Student.findOneAndUpdate({ userId }, { password: hashPassword });

            if (!user) {
                user = await Lecturer.findOne({ userId }, { password: hashPassword });
            }

            if (user) {
                const emailMessage = { // thiết lập đối tượng, nội dung gửi mail
                    from: 'Hệ thống quản lý đề tài',
                    to: 'yenb1910335@student.ctu.edu.vn',
                    subject: 'Reset mật khẩu tài khoản người dùng',
                    html: resetPasswordEmailMessage(userId, newPassword)
                }

                transporter.sendMail(emailMessage).then(console.log).catch(console.error);
            }
            res.status(201).json({ statusCode: 200, message: 'Cập nhật mật khẩu cho người dùng thành công' });
        } catch (err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        }
    }

}

module.exports = new AuthController();
