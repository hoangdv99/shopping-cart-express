const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_products.controller');
var mkdirp = require('mkdirp');
var fs = require('fs');
var resizeImg = require('resize-img');

router.get('/', controller.getProductsIndex);

router.get('/add-product', controller.getAddProduct);

module.exports = router;
