var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/LecturerController');

router.get('/lecturers/:id', userController.getLecturersById);
router.get('/lecturers', userController.getLecturers);
router.get('/', userController.get);

module.exports = router;