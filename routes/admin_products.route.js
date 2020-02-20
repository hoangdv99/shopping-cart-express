const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_products.controller');
const validate = require('../validate/admin_product.validate');

router.get('/', controller.getProductsIndex);

router.get('/add-product', controller.getAddProduct);

router.post('/add-product', validate.postAddProduct, controller.postAddProduct);
module.exports = router;
