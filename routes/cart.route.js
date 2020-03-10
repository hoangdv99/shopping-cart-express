const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');

//get add to cart
router.get('/add/:product', controller.addToCart);

//get checkout page
router.get('/checkout', controller.getCheckout);
module.exports = router;