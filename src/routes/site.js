var express = require('express');
var router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/read-cookies', siteController.readCookies);
router.get('/set-cookies', siteController.setCookies);
router.get('/', siteController.index);

module.exports = router;
