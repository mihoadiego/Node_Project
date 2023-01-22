const Cart = require('./cart');
const {db, sql} = require('../../withpgpromise_database/database.js');
const uniqueID = () =>  Math.floor(Math.random() * Date.now())

module.exports = class Product {

  constructor(id, title='', image_url='', description='', price=0, isActive="isActive") {
    this.id = id;
    this.title = title;
    this.image_url = image_url;
    this.description= description;
    this.price = price;
    this.isActive = isActive;
  }

  // save () both managing creation and edition. if id, update, otherwise create
  save = async () => { 
    const fetchedProducts = await db.any(sql.manualModelManagement.models.product.fetchProductsByState, {status: true})
    
    const details = {
      title: this.title, 
      image_url: this.image_url, 
      description: this.description, 
      price: this.price
    };

    if (this.id == null || this.id == undefined || fetchedProducts.find(e => e.id == this.id) == undefined) {
      await db.none(sql.manualModelManagement.models.product.insertProduct, {...details});
    } else {
      await db.none(sql.manualModelManagement.models.product.updateProductById, {...details, id: this.id});
    };

  }

  static fetchAll = async () => { 
    try {
      const fetchedProducts = await db.any(sql.manualModelManagement.models.product.fetchProductsByState, {status: true})
      return fetchedProducts;
    } catch (e) {
      console.log('error while fetching complete list of products:', e)
    }
  }

  static findProductById = async (id) => {
    const fetchedProduct = await db.oneOrNone(sql.manualModelManagement.models.product.fetchProductById, {id})
    return fetchedProduct;
  }

  static deleteById = async (productId) => {
    await db.none(sql.manualModelManagement.models.product.softDeleteProductById , {id: productId})
  }
  
};