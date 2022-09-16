/**
 * path and rootDir mandatory if not using templating (ie if only using sendFile methods to redirect to .html files)
 * important if not using templating
 *      path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 *      path.join() handles efficiently both linux + windows + mac path syntaxes! / VS \ and makes it possible to use ../ to go one level up for example
 */
const path = require('path')
const rootDir = require('../utils/path')

/**
 * import the product model to be able then to instantiate an instance of it
 */
const Product = require('../models/product');
const { REPL_MODE_STRICT } = require('repl');

exports.get_Controller_Products = (req, res, next) => {
/**
 * if not using templating , (ie without ejs), an html file /views/shop.html is required and will be rendered thanks to sendFile and path.join()  
 * path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 * path.join() handles efficiently both linux + windows + mac path syntaxes! / VS \ and makes it possible to use ../ to go one level up for example
 */ 
    // res.status(200).sendFile(path.join(rootDir, 'views', 'shop.html')); 
    
/**
 * if using templating with ejs, we will take advantage of .render() method, 
 * ... that first tell which template to use (confere app.js => app.set('view engine') + app.set('views')) (here shop in /views/shop.ejs )
 * ... and secondly the props/variables to pass to such templating
 */

    Product.fetchAll((products) => { 
        // we pass a ()=>{} to fetchAll, that renders templating, because fetchAll in the Product Class takes a callback function as argument
        res.render('shop/product-list', {prods: products, pageTitle: 'All Products', path: '/products'});
    });
}

exports.get_Controller_ProductDetail = (req, res, next) =>{
    // req.params.productId because we defined the param this way in /routes/shop.js => router.get('/products/:productId'...)
    const {productId} = req.params
    Product.findProductById(productId, (product) =>{console.log('Details', product); res.render('shop/product-detail', {product, pageTitle: `details - ${product?.title}`, path:'/products'})})
}

exports.get_Controller_Index = (req, res, next) => {
// we pass a ()=>{} to fetchAll, that renders templating, because fetchAll in the Product Class takes a callback function as argument
    Product.fetchAll((products) => {
            res.render('shop/index', {prods: products, pageTitle: 'Shop',path: '/'});
        }
    );
};

exports.get_Controller_Cart = (req, res, next) => {
    res.render('shop/cart', {path: '/cart', pageTitle: 'Your Cart'});
};

exports.post_Controller_Cart = (req, res, next) => {
    console.log(req.body.productId)
    res.redirect('/cart')
};

exports.get_Controller_Checkout = (req, res, next) => {
    res.render('shop/checkout', {path: '/checkout',pageTitle: 'Checkout'});
};

exports.get_Controller_Orders = (req, res, next) => {
    res.render('shop/orders', {path: '/orders', pageTitle: 'Your Orders'});
};

