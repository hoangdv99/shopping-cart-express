const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_categories.controller');
const validate = require('../validate/admin_category.validate');

router.get('/', controller.getCategories);

router.get('/add-category', controller.getAddCategory);

router.post('/add-category', validate.postAddCategory, controller.postAddCategory);

router.get('/edit-category/:id', controller.getEditCategory);

router.post('/edit-category/:id', validate.postEditCategory, controller.postEditCategory);

router.get('/delete-category/:id', controller.deleteCategory);
module.exports = router;