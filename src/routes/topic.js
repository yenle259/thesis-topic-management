var express = require('express');
var router = express.Router();

const topicController = require('../app/controllers/TopicController');

router.post('/', topicController.create);
router.get('/', topicController.get);

module.exports = router;
