const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

router.get('/all', controller.getAllProducts);

router.get('/:category', controller.getProductsByCategory);

router.get('/:category/:product', controller.getProductDetails);

module.exports = router;