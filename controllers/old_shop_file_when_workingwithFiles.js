/**
 * path and rootDir mandatory if not using templating (ie if only using sendFile methods to redirect to .html files)
 * important if not using templating
 *      path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 *      path.join() handles efficiently both linux + windows + mac path syntaxes! / VS \ and makes it possible to use ../ to go one level up for example
 */
//  const { REPL_MODE_STRICT } = require('repl');
const path = require('path')
const rootDir = require('../utils/path')
const {db} = require('../database/database.js')

/**
 * import the product and cart model to be able then to instantiate an instance of it
 */
const Product = require('../models/product');
const Cart = require('../models/cart');



exports.get_Controller_Products = async (req, res, next) => {
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
exports.post_Controller_ManageItemCart = (req, res, next) => {
    const {productIdToManageFromCart, productPriceToManageFromCart, productQtyToManageFromCart} = req.body;
    console.log(productIdToManageFromCart,productPriceToManageFromCart,productQtyToManageFromCart)
     /** 
     * productIdToManageFromCart... are part of the req.body thanks to the 
     *      <input type="hidden" name="productIdToManageFromCart" value="<% =p.productData.id%>"/> 
     * added to /views/shop/cart.ejs 
     * by doing so, we catch a productIdToManageFromCart in the req.body, 
     * and as the input is type hidden but gets the product, then we have it here!
     */ 

    if(!productQtyToManageFromCart || productQtyToManageFromCart===0 || !productIdToManageFromCart ) return res.redirect('/cart')
    
    productQtyToManageFromCart > 0
        ? Cart.addProductToCart(productIdToManageFromCart, productPriceToManageFromCart || 0, productQtyToManageFromCart )
        // converting quantity to positive value (Math.abs) when deleteProductFromCartById. why? to be managed by Cart class method deleteProductFromCartById
        : Cart.deleteProductFromCartById(productIdToManageFromCart,productPriceToManageFromCart, Math.abs(productQtyToManageFromCart))

    res.redirect('/cart')

}
exports.get_Controller_Cart = (req, res, next) => {
    Cart.getCartProducts(
        // getCartProduct(cb) takes thus a callback function as arg. and within such cb arg, we call Product.fetchAll that also takes a cb as arg 
        (cart)=> {

            Product.fetchAll(
                // arg of fetchAll(cb) is also a callback. thus we are in the callback of a callback!
                (products) => {
                    const fullCartProductsDetails = [];
                    let ref;
                    for (product of products){
                        ref = cart.products.find(p=>p.id === product.id) 
                        if (ref !== undefined){
                            fullCartProductsDetails.push({ productData: {...product}, qty: ref.qty });
                        }
                    }

                    res.render(
                        'shop/cart', 
                        { path: '/cart', 
                          pageTitle: 'Your Cart',
                          products: fullCartProductsDetails
                        }
                    );
                }
            )

        }
    )
};

exports.post_Controller_Cart = (req, res, next) => {
    console.log('Detail req.body.ProductId', req.body.productId)
    /** 
     * productId is part of the req.body thanks to the 
     *      <input type="hidden" name="productId" value="<% =product.id%>"/> 
     * added to /views/includes/add-to-cart.ejs 
     * by doing so, we catch a productId in the req.body, 
     * and as the input is type hidden but gets the product Id as value from the productDetails page, then we have it here!
     */ 
    const {productId} = req.body;
    Product.findProductById(
        productId,
        (foundProduct) => {Cart.addProductToCart(productId, foundProduct.price || 0)} //cb function from Product Model => .findProductByid(id, cb) 
    )

    res.redirect('/cart')
};

exports.get_Controller_Checkout = (req, res, next) => {
    res.render('shop/checkout', {path: '/checkout',pageTitle: 'Checkout'});
};

exports.get_Controller_Orders = (req, res, next) => {
    res.render('shop/orders', {path: '/orders', pageTitle: 'Your Orders'});
};

