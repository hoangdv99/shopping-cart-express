const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_products.controller');
const validate = require('../validate/admin_product.validate');
var auth = require('../config/auth');

router.get('/', auth.isAdmin, controller.getProductsIndex);

router.get('/add-product', auth.isAdmin, controller.getAddProduct);

router.post('/add-product', validate.postAddProduct, controller.postAddProduct);

router.get('/edit-product/:id', auth.isAdmin, controller.getEditProduct);

router.post('/edit-product/:id', validate.postEditProduct, controller.postEditProduct);

router.post('/product-gallery/:id', controller.postGallery);

router.get('/delete-image/:image', auth.isAdmin, controller.deleteImage);

router.get('/delete-product/:id', auth.isAdmin, controller.deleteProduct);

module.exports = router;
