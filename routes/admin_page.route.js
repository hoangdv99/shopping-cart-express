const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_page.controller');


router.get('/admin', controller.admin);

router.get('/add-page', controller.getAddPage);

router.post('/add-page', controller.postAddPage);

router.get('/pages', controller.getPagesIndex);

router.post('/reorder-pages', controller.postReorderPages);

router.get('/edit-page/:id', controller.getEditPage);

router.post('/edit-page/:id', controller.postEditPage);

router.get('/delete-page/:id', controller.deletePage);

module.exports = router;
