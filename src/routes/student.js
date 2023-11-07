var express = require('express');
var router = express.Router();

const studentController = require('../app/controllers/StudentController');

router.get('/module/:id', studentController.getRegisterModule);
router.post('/account/import', studentController.importAccount);

router.put('/update/:id', studentController.update);

router.get('/:id', studentController.getStudentByUserId);
router.delete('/:id', studentController.deleteStudent);
router.post('/', studentController.create);
router.get('/', studentController.getStudentsPerPage);

module.exports = router;
