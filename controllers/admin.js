// const Product = require('../manualModelManagement/models/product'); // when using pg_pomise
const Product = require('../models').product; // when using migration commands from sequelize
// const Product = require('../models/product') when managing sequelize manually
const { request } = require('express');
const sequelize = require('sequelize')



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

exports.post_AdminController_DeleteProduct = async (req, res, next) => {
  const { productId } = req.body;
  console.log(productId)
  // Product.deleteById(productId); // when using pg_promise

  await Product.update(
    {
      is_active: false
    }, 
    {
      where: {
        id: productId
      }
    }
  )

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

      //const product = await Product.findProductById(productId) // when using pg_promise

      const product = await Product.findOne({
        attributes: ['id', 'title', 'price', 'image_url', 'description', 'is_active', 'created_at', 'updated_at'], 
        where:{id: productId}
      }) // we could have used req.user.getProducts({where:{id: productId}}) thanks to global middleware set in app.js + the associations set in models. see main_notes (part import to read too from sequelize section) to know more! but warning cause req.user.getProducts will return an Array, not an object then!


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
     // when using pg_promise below:
        //try{

        // const product = new Product(null, title, image_url, description, price, isActive); // null because no id yet so setting id to null // when using pg_promise
        // product.save();// when using pg_promise
        // } catch(e){
        //   console.log(e)
        // }

        // instead of doing Product.create({title, image_url, userId: req.user.id ...}), 
        //    and thanks to the associations set in our models/migrations,
        //    and also thanks to the global middleware set in app.js, to get req.user everywhere
        // we can benefit the magic of sequelize'association methods like below 

        // Product.create({title, image_url, description, price, is_active: isActive == 'isActive' ? true: false, userId:  req.user.id })
        req.user.createProduct({
          title, 
          image_url, 
          description, 
          price, 
          is_active: isActive == 'isActive' ? true: false})
          .then(result=> console.log(result))
          .catch(err=> console.log(err))
        
        res.redirect('/');
      
   }
};

exports.get_AdminController_Products = async (req, res, next) => {
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
  res.render('admin/products', {
    prods: fetchedProducts,
    pageTitle: 'Admin Products',
    path: '/admin/products'
  });
};

exports.post_AdminController_EditProduct = async (req, res, nex) => {
  console.log(req.body)
  const {
    productId: productIdUpdated, 
    title: titleUpdated, 
    image_url: image_url_updated, 
    description: descriptionUpdated, 
    price: priceUpdated, 
    isActive: isActiveUpdated 
  } = req.body;

  
  try {

    // when using pg_promise:
    // const productUpdated = new Product(
    //   productIdUpdated,
    //   titleUpdated,
    //   image_url_updated,
    //   descriptionUpdated,
    //   priceUpdated,
    //   isActiveUpdated
    // );
    // productUpdated.save(); // when using pg_promise
    // res.redirect('/admin/products')
    
    await Product.update(
      {
        id: productIdUpdated, 
        title: titleUpdated, 
        price: priceUpdated, 
        image_url: image_url_updated, 
        description: descriptionUpdated,
        is_active: isActiveUpdated == 'isActive' ? true : false,
      }, 
      {
        where: {
          id: productIdUpdated
        }
      }
    )
    res.redirect('/admin/products')
  } catch(e){
    console.log(e)
  }
}