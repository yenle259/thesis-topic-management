var express = require('express');
var router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post('/lecturer/signup', authController.handleLecturerSignup);
router.post('/student/signup', authController.handleStudentSignup);

router.post('/signup', authController.handleUserSignup);
router.post('/login', authController.handleLoginActions);

router.put('/update', authController.updatePassword);
router.put('/reset/:id', authController.resetPassword);
router.get('/reset/:id', authController.getUserInfoByUserId);

router.get('/logout', authController.logout);
router.get('/', authController.login);

module.exports = router;
