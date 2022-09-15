/*
 * path and rootDir mandatory if not using templating (ie if only using sendFile methods to redirect to .html files)
 * important if not using templating
 *      path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 *      path.join() handles efficiently both linux + windows + mac path syntaxes! / VS \ and makes it possible to use ../ to go one level up for example
 */
const path = require('path')
const rootDir = require('../utils/path')


const Product = require('../models/product');


exports.get_AdminController_AddProduct = (req, res, next) => {
/**
 * if not using templating , (ie without ejs), an html file /views/add-product.html is required and will be rendered thanks to sendFile and path.join()  
 * path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 * path.join() handles efficiently both linux + windows + mac path syntaxes! / VS \ and makes it possible to use ../ to go one level up for example
 */ 
// res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));

    /**
     * if using templating with ejs, we will take advantage of .render() method, 
     * ... that first tell which template to use (confere app.js => app.set('view engine') + app.set('views')) (here shop in /views/shop.ejs )
     * ... and secondly the props/variables to pass to such templating
     */
    res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
    });
};


exports.post_AdminController_AddProduct = (req, res, next) => {
/**
 *  req.body contains a key named 'title', because the CRUCIAL part here is the link between here & the /views/add-product.html
 *  Indeed, we gave a 'name' props to the <input name="title"> in /views/add-product.html or /views/ADMIN/add-product.ejs if using templating
 *  thus req.body.title exists containing the data typed in in the input when submiting it
 */ 
   const {title, imageUrl, description, price, isActive} = req.body;
   if (title?.length > 0 && description?.length > 0 && price?.length > 0) {
        const product = new Product(title, imageUrl, description, price, isActive);
        product.save();
        res.redirect('/');
   }
};

exports.get_AdminController_Products = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};