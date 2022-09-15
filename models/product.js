const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/path') // helper to get the root path of the project

const p = path.join(rootDir,'data','products.json'); // leading to /data/products.json (readable in every single OS - Mac, linux, windows...)

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

function uniqueID() {
  return Math.floor(Math.random() * Date.now())
  }


module.exports = class Product {
  constructor(title, imageUrl, description, price, isActive) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description= description;
    this.price = price;
    this.isActive = isActive;
  }

  save() {
    this.id= uniqueID().toString();
    getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {console.log(err);
            });
        }
    );
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findProductById(id, cb) {
    getProductsFromFile((products) => {
        const product = products?.find?.(e => e.id === id)
        cb(product)
      }
    )
  }

};