const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_page.controller');

var page = require('../models/page');

router.get('/admin', controller.admin);

router.get('/add-page', controller.getAddPage);

router.post('/add-page', controller.postAddPage);

router.get('/pages', controller.getPagesIndex);

router.post('/reorder-pages', controller.postReorderPages);

router.get('/edit-page/:slug', controller.getEditPage);

router.post('/edit-page/:slug', controller.postEditPage);
module.exports = router;
