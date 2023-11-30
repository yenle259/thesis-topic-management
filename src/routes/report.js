var express = require('express');
var router = express.Router();

const reportController = require('../app/controllers/ReportTopicController');
const { checkRegisterReportTime } = require('../middleware/reportTopicMiddleware')

router.put('/review', checkRegisterReportTime, reportController.reviewRegisterReport);
router.put('/register', checkRegisterReportTime, reportController.registerReport);

router.get('/student/:id', reportController.getReportOfStudent);
router.get('/lecturer/:id', reportController.getReportByLecturerId);

router.get('/reported', reportController.getReported);
router.get('/', reportController.get);

module.exports = router;
