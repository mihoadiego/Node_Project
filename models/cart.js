const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path') // helper to get the root path of the project

const p = path.join(rootDir,'data','cart.json'); // leading to /data/cart.json (readable in every single OS - Mac, linux, windows...)

module.exports = class Cart {

  static addProductToCart(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        // if file could be opened and read, pass its converted content to cart variable .. but if content is empty, do nothing and leave cart with its default value 
        Object.getOwnPropertyNames(fileContent).length === 0 ? null : cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find if product already in the cart or not
      const existingProductIndex = cart.products?.findIndex?.(
        prod => prod.id === id
      );

      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProductIndex >= 0) {
        const existingProduct = cart.products[existingProductIndex];
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = cart.products.length ? [...cart.products, updatedProduct]: [updatedProduct];
      }
      // update total Price of the cart, with this new product. the extra '+' helps converting the format to number
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(
        p, 
        JSON.stringify(cart), 
        err => {console.log(err)}
      );
    });
  }
};