var express = require('express');
var router = express.Router();

const moduleController = require('../app/controllers/ModuleController');

router.delete('/remove/:id', moduleController.remove);
router.post('/create', moduleController.addModule);
router.get('/', moduleController.get);

module.exports = router;
