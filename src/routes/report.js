var express = require('express');
var router = express.Router();

const reportController = require('../app/controllers/ReportTopicController');

router.get('/lecturer/:id', reportController.getReportByLecturerId);
router.get('/', reportController.get);

module.exports = router;
