const express = require('express');
const router = express.Router();

/**
 * import controllers methods that we be executed for each route
 */
const {get_AdminController_AddProduct, post_AdminController_AddProduct, get_AdminController_Products} = require('../controllers/admin')
/**
 * important 
 *      router.get('/', ...)   => provides a perfect and strict match of '/' route (ie /coconut will not match). same for router.post...
 *      router.use('/', ...)   => provides a match if the route starts with '/'... so in this case '/coconut' will match! Huge difference though
 */


//  /admin/add-product      =>  GET
router.get('/add-product', get_AdminController_AddProduct);


// /admin/products          => GET
router.get('/products', get_AdminController_Products);


//  /admin/add-product      =>  POST
router.post('/add-product', post_AdminController_AddProduct);



module.exports = router;
