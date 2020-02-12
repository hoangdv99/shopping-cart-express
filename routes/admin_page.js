const express = require('express');
const router = express.Router();
const validate = require('../validate/addpage.validate');
const controller = require('../controllers/admin_page.controller');

var page = require('../models/page');

router.get('/admin', controller.admin);

router.get('/add-page', controller.getAddPage);

router.post('/add-page', validate.postAddPage, controller.postAddPage);

router.get('/pages', controller.getPagesIndex);

router.post('/reorder-pages', controller.postReorderPages);

router.get('/edit-page/:slug', controller.getEditPage);

router.post('/edit-page/:slug', validate.postAddPage, controller.postEditPage);
module.exports = router;
