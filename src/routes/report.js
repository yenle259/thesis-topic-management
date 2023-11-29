var express = require('express');
var router = express.Router();

const reportController = require('../app/controllers/ReportTopicController');

router.put('/review', reportController.reviewRegisterReport);
router.put('/register', reportController.registerReport);

router.get('/student/:id', reportController.getReportOfStudent);
router.get('/lecturer/:id', reportController.getReportByLecturerId);
router.get('/', reportController.get);

module.exports = router;
