const express = require('express');
const router = express.Router();
const controller = require('../controllers/page.controller');

router.get('/', controller.index);

router.get('/:slug', controller.getAPage);

module.exports = router;