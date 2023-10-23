var express = require('express');
var router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post('/student/signup', authController.handleStudentSignup);
router.post('/signup', authController.handleUserSignup);
router.post('/login', authController.handleLoginActions);
router.get('/logout', authController.logout);
router.get('/', authController.login);

module.exports = router;
