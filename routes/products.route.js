const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');
var auth = require('../config/auth');

router.get('/', controller.getAllProducts);

router.get('/:category', controller.getProductsByCategory);

router.get('/:category/:product', controller.getProductDetails);

module.exports = router;