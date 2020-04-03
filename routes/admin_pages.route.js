const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_pages.controller');
const validate = require('../validate/admin_page.validate');
var auth = require('../config/auth');

router.get('/admin', auth.isAdmin, controller.admin);

router.get('/add-page', auth.isAdmin, controller.getAddPage);

router.post('/add-page', validate.postAddPage, controller.postAddPage);

router.get('/', auth.isAdmin, controller.getPagesIndex);

router.post('/reorder-pages', controller.postReorderPages);

router.get('/edit-page/:id', auth.isAdmin, controller.getEditPage);

router.post('/edit-page/:id', validate.postEditPage, controller.postEditPage);

router.get('/delete-page/:id', auth.isAdmin,controller.deletePage);

module.exports = router;
