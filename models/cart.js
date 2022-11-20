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



  static deleteProductFromCartById(id, productPrice=0, quantityToRemove=null) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      if(err) return ;
        // if file could be opened and read, pass its converted content to cart variable .. but if content is empty, do nothing and leave cart with its default value 
      if (Object.getOwnPropertyNames(fileContent).length === 0) return  
      const cart = JSON.parse(fileContent);

      // Analyze the cart => Find if product already in the cart or not
      const associatedProductIndex = cart.products?.findIndex?.(
        prod => prod.id === id
      );
      
      let associatedProduct;
      let deducedQuantity = quantityToRemove
      let message;
      let newTotalCartPrice;

      // Add new product/ increase quantityToRemove
      if (associatedProductIndex >= 0 ) {
        associatedProduct = { ...cart.products[associatedProductIndex] };  
        cart.products = [...cart.products];
      
        if (deducedQuantity !== null){
          
          //deduce quantity. if quantity > existing cart quantity... return qty = 0
          deducedQuantity = quantityToRemove <= associatedProduct.qty 
            ? quantityToRemove 
            : +associatedProduct.qty;
          
          associatedProduct.qty = +associatedProduct.qty -  deducedQuantity;
          cart.products[associatedProductIndex] = associatedProduct;
          message = `deducing ${deducedQuantity} units from cart, for ProductId ${id}`

        } else {
          
          //if no quantity, means that complete deletion to be processed
          deducedQuantity = associatedProduct.qty;
          cart.products = [...cart.products?.filter?.(p => p.id!==id)];
          message = `deleting ${id} definitely from cart`;

        }
      
        newTotalCartPrice = cart.totalPrice - (+deducedQuantity * +productPrice);

        console.log(`CART UPDATE: initial amount:${cart.totalPrice} / new total:${newTotalCartPrice}. Associated actions: ${message}`);
        
        cart.totalPrice = newTotalCartPrice;
        
        fs.writeFile(
          p, 
          JSON.stringify(cart), 
          err => {console.log(err)}
        );
      }
    });
  }
};