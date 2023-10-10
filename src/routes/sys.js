var express = require('express');
var router = express.Router();

const sysController = require('../app/controllers/SchoolYearSemesterController');

router.post('/establish', sysController.establish);
router.post('/create', sysController.create);
router.get('/', sysController.getAll);

module.exports = router;
