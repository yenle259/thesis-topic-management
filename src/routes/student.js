var express = require('express');
var router = express.Router();

const studentController = require('../app/controllers/StudentController');

router.put('/update/:id', studentController.update);
router.get('/:id', studentController.getStudentByUserId);
router.post('/', studentController.create);
router.get('/', studentController.getStudents);

module.exports = router;
