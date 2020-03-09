const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');

//get add to cart
router.get('/add/:product', controller.addToCart);

module.exports = router;