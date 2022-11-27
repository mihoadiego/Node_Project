const Product = require('../manualModelManagement/models/product');


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
    res.render('admin/edit-product', { // as admin/add-product and admin/edit-product were rendering same info, we grouped it in only one admin/edit-product. thus admin/edit-product.ejs is an ejs model both for add and edit product issues
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
    });
};

exports.post_AdminController_DeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  console.log(productId)
  Product.deleteById(productId);
  res.redirect('/admin/products')

}


exports.get_AdminController_EditProduct = async (req, res, next) => {
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

      const editMode = req.query.edit 
      // get here the query param value for 'edit' in the url. to be sure that we are asking for an edit Page
      // we set the edit=true in the views/admin/products.ejs where we have a   <a href="/admin/edit-product/<%=product.id%>?edit=true" class="btn">Edit</a> 
      // example of url: localhost:3000/admin/edit-product/48715214525?edit=true
      // to be noticed: editMode = req.query.edit    =>>>  editMode will then be equal to 'true' and not true (in string format) 
      if (!editMode) return res.redirect('/')

      const productId = req.params.productId // directly linked to routes/admin.js where we have router.get('/edit-product/:productId', get_AdminController_EditProduct);

      const product = await Product.findProductById(productId)
      if (!product) return res.redirect('/')
      res.render('admin/edit-product', { //  admin/edit-product and admin/add-product being as a reminder grouped into one. thus admin/edit-product.ejs is an ejs model both for add and edit product issues
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode, // to differentiate addProduct and EditProduct. for ex. used in admin/edit-product.ejs file to adapt inner text of action/submit button ...
        product: product, 
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      })
};

exports.post_AdminController_AddProduct = (req, res, next) => {
/**
 *  req.body contains a key named 'title', because the CRUCIAL part here is the link between here & the /views/add-product.html
 *  Indeed, we gave a 'name' props to the <input name="title"> in /views/add-product.html or /views/ADMIN/add-product.ejs if using templating
 *  thus req.body.title exists containing the data typed in in the input when submiting it
 */ 
   const {title, image_url, description, price, isActive} = req.body;
   if (title?.length > 0 && description?.length > 0 && price?.length > 0) {
        const product = new Product(null, title, image_url, description, price, isActive); // null because no id yet so setting id to null
        product.save();
        res.redirect('/');
   }
};

exports.get_AdminController_Products = async (req, res, next) => {
  const fetchedProducts = await Product.fetchAll();
  res.render('admin/products', {
    prods: fetchedProducts,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
};

exports.post_AdminController_EditProduct = (req, res, nex) => {
  const {
    productId: productIdUpdated, 
    title: titleUpdated, 
    image_url: image_url_updated, 
    description: descriptionUpdated, 
    price: priceUpdated, 
    isActive: isActiveUpdated 
  } = req.body;

  const productUpdated = new Product(
    productIdUpdated,
    titleUpdated,
    image_url_updated,
    descriptionUpdated,
    priceUpdated,
    isActiveUpdated
  );

  productUpdated.save();

  res.redirect('/admin/products')

}