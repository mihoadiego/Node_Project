const fs = require('fs')
const path = require('path')
const rootDir = require('../../utils/path') // helper to get the root path of the project

const p = path.join(rootDir,'data','products.json'); // leading to /data/products.json (readable in every single OS - Mac, linux, windows...)
const dp = path.join(rootDir, 'data', 'deleted_products.json') // leading to /data/deleted_products.json (readable in every single OS - Mac, linux, windows...)

const Cart = require('./cart')

const {db} = require('../../withpgpromise_database/database.js')

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) { // ie if file does not exists or if we could not read it, pass an empty array to the callback function
      cb([]);
    } else {
        // if if file could be opened and read, pass its converted content to the callback function .. but if content is empty, pass an empty array to avoid errors
        Object.getOwnPropertyNames(fileContent).length ===0 ? cb([]) : cb(JSON.parse(fileContent)) 
    }
  });
};


const getProductsFromDatabase = async cb => {
  try {
    const fetchedProducts = await db.any(`SELECT * FROM public.products`)
    return cb(fetchedProducts);
  } catch (e) {
    console.log('error while fetching complete list of products:', e)
  }
}


const getDeletedProductsFromFile = cb =>{
  fs.readFile(dp, (err, fileContent) =>{
    if(err){
      cb([])
    } else{
      Object.getOwnPropertyNames(fileContent).length === 0 ? cb([]) : cb(JSON.parse(fileContent));
    }
  });
};

function uniqueID() {
  return Math.floor(Math.random() * Date.now())
}


module.exports = class Product {
  constructor(id, title='', imageUrl='', description='', price=0, isActive="isActive") {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description= description;
    this.price = price;
    this.isActive = isActive;
  }

  save() { 
    // save () both managing creation and edition. if id, update, otherwise create
    getProductsFromFile(
      (products) => {
        const updatedProducts = [...products];
        if(this.id) {
          const existingProductIndex = products.findIndex(p => p.id == this.id)
          updatedProducts[existingProductIndex] = this;
        } else {
          this.id= uniqueID().toString();
          updatedProducts.push(this);
        }
        fs.writeFile(
          p, 
          JSON.stringify(updatedProducts), 
          err => {console.log(err)}
        );
      }
    );
  }

  static fetchAll(cb) {
    // getProductsFromDatabase(cb);
    getProductsFromFile(cb);
  }

  static findProductById(id, cb) {
    getProductsFromFile(
      (products) => {
        const product = products?.find?.(e => e.id === id)
        cb(product)
      }
    )
  }

  static deleteById(productId) {
    getProductsFromFile(
      (products) => {
        
        // step 1 : find the product to be deleted, to store it in the deleted_product list
        const deletedProduct = products?.find?.(p => p.id === productId);

        // step 2 : once product is found, add it to the existing deleted_products list file (data/deleted_products.json)
        getDeletedProductsFromFile(
          (deletedProductsList) => {
            const updatedDeletedProductsList = deletedProductsList.length ? [...deletedProductsList, deletedProduct]: [deletedProduct];
            fs.writeFile(dp, JSON.stringify(updatedDeletedProductsList), err => {console.log(err)})
        
            // step 3: delete product by updating products.json file
            const updatedProducts = [...products?.filter?.(p=> p.id !== productId)];
        
            console.log(`deletion of ${deletedProduct.title || null} from Product List`)
        
            fs.writeFile(
              p, 
              JSON.stringify(updatedProducts), 
              err => {
                if(!err) {
                // step4 : update cart by deleting such product from cart if concerned
                Cart.deleteProductFromCartById(productId, deletedProduct.price, null);
                }
                console.log(err)
              }
            )
          }
        )
      }
    )
  }

};