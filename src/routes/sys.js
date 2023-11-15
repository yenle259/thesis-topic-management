var express = require('express');
var router = express.Router();

const sysController = require('../app/controllers/SchoolYearSemesterController');

router.post('/establish', sysController.establish);
router.post('/create', sysController.create);
router.get('/main', sysController.getMain);
router.get('/', sysController.getAll);

module.exports = router;
