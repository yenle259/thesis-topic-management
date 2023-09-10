var express = require('express');
var router = express.Router();

const authController = require('../app/controllers/AuthController');

router.post('/signup', authController.handleSignupActions);
router.post('/login', authController.handleLoginActions);
router.get('/', authController.login);

module.exports = router;
