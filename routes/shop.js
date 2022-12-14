const express = require('express');
const router = express.Router();

/**
 * import controllers methods that we be executed for each route
 */
const {get_Controller_Index, get_Controller_Products, get_Controller_Cart, post_Controller_Cart, post_Controller_ManageItemCart, get_Controller_Checkout, get_Controller_Orders, get_Controller_ProductDetail} = require('../controllers/shop')

/**
 * important 
 *      router.get('/', ...)   => provides a perfect and strict match of '/' route (ie /coconut will not match). same for router.post...
 *      router.use('/', ...)   => provides a match if the route starts with '/'... so in this case '/coconut' will match! Huge difference though
 */

router.get('/', get_Controller_Index);

// products
router.get('/products', get_Controller_Products );

router.get('/products/:productId', get_Controller_ProductDetail)

// cart
router.get('/cart', get_Controller_Cart);
router.post('/cart-manage-item', post_Controller_ManageItemCart);
router.post('/cart', post_Controller_Cart);

//login-checkout
router.get('/checkout', get_Controller_Checkout);

//orders
router.get('/orders', get_Controller_Orders)


module.exports = router;