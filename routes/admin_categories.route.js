const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_categories.controller');

router.get('/', controller.getCategories);

router.get('/add-category', controller.getAddCategory);

router.post('/add-category', controller.postAddCategory);

module.exports = router;