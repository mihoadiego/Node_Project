const Cart = require('./cart')
const {db} = require('../database/database.js')


function uniqueID() {
  return Math.floor(Math.random() * Date.now())
}
module.exports = class Product {
  constructor(id, title='', image_url='', description='', price=0, isActive="isActive") {
    this.id = id;
    this.title = title;
    this.image_url = image_url;
    this.description= description;
    this.price = price;
    this.isActive = isActive;
  }

  save = async () => { 
    // save () both managing creation and edition. if id, update, otherwise create
    const fetchedProducts = await db.any(`SELECT * FROM public.products`)
    if (!this.id || !!fetchedProducts.find(e=>e.id == this.id)) db.none(`
      INSERT INTO public.products 
        (title, image_url, description, price) 
      VALUES 
        ($[title], $[image_url], $[description], $[price])`, 
      {title: this.title, image_url: this.image_url, description: this.description, price: this.price}
    )
  }

  static fetchAll = async () => {
    try {
      const fetchedProducts = await db.any(`SELECT * FROM public.products`)
      return fetchedProducts;
    } catch (e) {
      console.log('error while fetching complete list of products:', e)
    }
  }

  static findProductById(id, cb) {
   
  }

  static deleteById(productId) {
  }
};