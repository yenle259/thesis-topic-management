var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.put('/publish/set', siteController.set);
router.post('/publish/create', siteController.create);
router.get('/publish', siteController.get);

router.patch('/report-time', siteController.setRegisterReportTime);
router.get('/report-time', siteController.getRegisterReportTime);
router.patch('/register-time', siteController.setRegisterTopicTime);
router.get('/register-time', siteController.getRegisterTopicTime);
router.post('/manage', siteController.init);

router.get('/read-cookies', siteController.readCookies);
router.get('/set-cookies', siteController.setCookies);
router.get('/', siteController.index);

module.exports = router;
