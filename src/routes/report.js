var express = require('express');
var router = express.Router();

const reportController = require('../app/controllers/ReportTopicController');

router.get('/', reportController.get);

module.exports = router;
