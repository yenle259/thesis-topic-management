var express = require('express');
var router = express.Router();

const topicController = require('../app/controllers/TopicController');

router.post('/register', topicController.register);
router.post('/student', topicController.getTopicByStudentId);
router.get('/lecturer/:id', topicController.getTopicByLecturerId);
router.put('/unregister/:slug', topicController.removeStudentId);
router.get('/:slug', topicController.getTopicBySlug);
router.post('/', topicController.create);
router.get('/', topicController.get);

module.exports = router;
