/**
 * path and rootDir mandatory if not using templating (ie if only using sendFile methods to redirect to .html files)
 * important if not using templating
 *      path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 *      path.join() handles efficiently both linux + windows + mac path syntaxes! / VS \ and makes it possible to use ../ to go one level up for example
 */
//  const { REPL_MODE_STRICT } = require('repl');
const path = require('path');
const rootDir = require('../utils/path')
const {db} = require('../withpgpromise_database/database.js')

/**
 * import the product and cart model to be able then to instantiate an instance of it
 */
// const Product = require('../manualModelManagement/models/product'); // when using pg_promise
const Cart = require('../manualModelManagement/models/cart');

const Product = require('../models').product;
const { request } = require('express');
const sequelize = require('sequelize')


// need to add to each product query the 
// attributes: ['id', 'title', 'price', 'image_url', 'description', 'is_active', 'created_at', 'updated_at'], 
// because made mistake at sequelize init thus always requesting for createdAt unexisting column if not adding attributes


exports.get_Controller_Products = async (req, res, next) => { 
/**
 * if using templating with ejs, we will take advantage of .render() method, 
 * ... that first tell which template to use (confere app.js => app.set('view engine') + app.set('views')) (here shop in /views/shop.ejs )
 * ... and secondly the props/variables to pass to such templating
 */
    // const fetchedProducts = await Product.fetchAll(); // when using pg_promise
    const fetchedProducts = await Product.findAll({
        attributes: ['id', 'title', 'price', 'image_url', 'description', 'is_active', 'created_at', 'updated_at'], 
        where: {
            is_active: {
                [sequelize.Op.eq]: true
            }
        },
        order: sequelize.literal('created_at DESC')
    });  
    res.render(
        'shop/product-list', 
        {
            prods: fetchedProducts, 
            pageTitle: 'All Products', 
            path: '/products'
        }
    );
}

exports.get_Controller_ProductDetail = async (req, res, next) => {
    // req.params.productId because we defined the param this way in /routes/shop.js => router.get('/products/:productId'...)
    const {productId} = req.params;

    // const fetchedProductDetails = await Product.findProductById(productId); //when using pg_promise

    const fetchedProductDetails = await Product.findOne({
        attributes: ['id', 'title', 'price', 'image_url', 'description', 'is_active', 'created_at', 'updated_at'], 
        where:{id: productId}
    })

    res.render(
        'shop/product-detail', 
        {
            product: fetchedProductDetails, 
            pageTitle: `details - ${fetchedProductDetails?.title}`, 
            path:'/products'
        }
    )
}

exports.get_Controller_Index = async (req, res, next) => {
    // const fetchedProducts = await Product.fetchAll(); // when using pg_promise
    const fetchedProducts = await Product.findAll({
        attributes: ['id', 'title', 'price', 'image_url', 'description', 'is_active', 'created_at', 'updated_at'], 
        where: {
            is_active: {
                [sequelize.Op.eq]: true
            }
        },
        order: sequelize.literal('created_at DESC')
    });  
    res.render(
        'shop/index', 
        {
            prods: fetchedProducts, 
            pageTitle: 'Shop',
            path: '/'
        }
    );
};

exports.post_Controller_ManageItemCart = (req, res, next) => {
/** 
 * productIdToManageFromCart... are part of the req.body thanks to the 
 *      <input type="hidden" name="productIdToManageFromCart" value="<% =p.productData.id%>"/> 
 * added to /views/shop/cart.ejs 
 * by doing so, we catch a productIdToManageFromCart in the req.body, 
 * and as the input is type hidden but gets the product, then we have it here!
 */ 
    
    const {productIdToManageFromCart, productPriceToManageFromCart, productQtyToManageFromCart} = req.body;
    if(!productQtyToManageFromCart || productQtyToManageFromCart===0 || !productIdToManageFromCart ) return res.redirect('/cart')
    
    productQtyToManageFromCart > 0
        ? Cart.addProductToCart(productIdToManageFromCart, productPriceToManageFromCart || 0, productQtyToManageFromCart )
        // converting quantity to positive value (Math.abs) when deleteProductFromCartById. why? to be managed by Cart class method deleteProductFromCartById
        : Cart.deleteProductFromCartById(productIdToManageFromCart,productPriceToManageFromCart, Math.abs(productQtyToManageFromCart))

    res.redirect('/cart')
}

exports.get_Controller_Cart = async (req, res, next) => {

    Cart.getCartProducts(
        // getCartProduct(cb) takes a callback function as arg. 
        async (cart)=> {
            const fetchedProducts = await Product.fetchAll();
            const fullCartProductsDetails = [];
            let ref;
            for (product of fetchedProducts){
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
        })
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
    res.render(
        'shop/checkout', 
        {
            path: '/checkout',
            pageTitle: 'Checkout'
        }
    );
};

exports.get_Controller_Orders = (req, res, next) => {
    res.render(
        'shop/orders', 
        {
            path: '/orders', 
            pageTitle: 'Your Orders'
        }
    );
};

