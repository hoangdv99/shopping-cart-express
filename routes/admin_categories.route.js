const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_categories.controller');
const validate = require('../validate/admin_category.validate');
var auth = require('../config/auth');

router.get('/', auth.isAdmin, controller.getCategories);

router.get('/add-category', auth.isAdmin, controller.getAddCategory);
 
router.post('/add-category', validate.postAddCategory, controller.postAddCategory);

router.get('/edit-category/:id', auth.isAdmin, controller.getEditCategory);

router.post('/edit-category/:id', validate.postEditCategory, controller.postEditCategory);

router.get('/delete-category/:id', auth.isAdmin, controller.deleteCategory);
module.exports = router;