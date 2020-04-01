const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');

//get add to cart
router.get('/add/:product', controller.addToCart);

//get checkout page
router.get('/checkout', controller.getCheckout);

//get update product
router.get('/update/:product', controller.updateProduct);

//get clear cart
router.get('/clear', controller.clearCart);

//get buy now
router.get('/buynow', controller.buyNow);
module.exports = router;