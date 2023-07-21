var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/', userController.get);

module.exports = router;
