var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/LecturerController');

router.put('/update/:id', userController.updateLecturer);
router.post('/account/import', userController.importAccount);
router.post('/account', userController.createLecturer);
router.get('/lecturers/:id', userController.getLecturersById);
router.get('/lecturers', userController.getLecturers);
router.get('/', userController.get);

module.exports = router;
