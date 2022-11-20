const express = require('express');
const router = express.Router();

/**
 * import controllers methods that we be executed for each route
 */
const {get_AdminController_AddProduct, post_AdminController_AddProduct, get_AdminController_Products, get_AdminController_EditProduct, post_AdminController_EditProduct, post_AdminController_DeleteProduct} = require('../controllers/admin')
/**
 * important reminder
 *      router.get('/', ...)   => provides a perfect and strict match of '/' route (ie /coconut will not match). same for router.post...
 *      router.use('/', ...)   => provides a match if the route starts with '/'... so in this case '/coconut' will match! Huge difference though
 */


//  /admin/add-product      =>  GET
router.get('/add-product', get_AdminController_AddProduct);


// /admin/products          => GET
router.get('/products', get_AdminController_Products);


//  /admin/add-product      =>  POST
router.post('/add-product', post_AdminController_AddProduct);


//  /admin/edit-product/:productId      =>  GET
router.get('/edit-product/:productId', get_AdminController_EditProduct);


//  /admin/edit-product      =>  POST
router.post('/edit-product', post_AdminController_EditProduct);

//  /admin/delete-product     =>  POST
router.post('/delete-product', post_AdminController_DeleteProduct);

module.exports = router;
