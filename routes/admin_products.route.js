const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_products.controller');
const validate = require('../validate/admin_product.validate');
const Category = require('../models/category');
const Product = require('../models/product');
router.get('/', controller.getProductsIndex);

router.get('/add-product', controller.getAddProduct);

router.post('/add-product', validate.postAddProduct, controller.postAddProduct);

router.get('/edit-product/:id', controller.getEditProduct);

router.post('/edit-product/:id', validate.postEditProduct, controller.postEditProduct);

router.post('/product-gallery/:id', controller.postGallery);

router.get('/delete-image/:image', controller.deleteImage);

module.exports = router;
