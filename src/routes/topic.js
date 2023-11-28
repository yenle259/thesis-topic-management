var express = require('express');
var router = express.Router();

const topicController = require('../app/controllers/TopicController');
const { checkRegisterTopicTime, isValidToRegister, isValidToSuggest } = require('../middleware/topicMiddleware');

router.post('/suggest', isValidToSuggest, topicController.suggested);
router.put('/review', topicController.review);
router.post('/register', checkRegisterTopicTime, isValidToRegister, topicController.register);

router.put('/update/:id', topicController.update);
router.get('/student/:id', topicController.getTopicByStudentId);
router.get('/lecturerUserId/:id', topicController.getTopicByLecturerUserId);
router.get('/lecturer/:id', topicController.getTopicByLecturerId);
router.put('/unregister/:slug', topicController.removeStudentId);
router.get('/find', topicController.getPerPage);

router.delete('/:id', topicController.deleteTopic);
router.get('/:slug', topicController.getTopicBySlug);
router.post('/', topicController.create);
router.get('/', topicController.get);

module.exports = router;
