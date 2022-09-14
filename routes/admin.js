const express = require('express');
const router = express.Router();
const rootDir = require('../utils/path')
/**
 * important 
 *      router.get('/', ...)   => provides a perfect and strict match of '/' route (ie /coconut will not match). same for router.post...
 *      router.use('/', ...)   => provides a match if the route starts with '/'... so in this case '/coconut' will match! Huge difference though
 */


router.get('/add-product', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views', 'add-product.html'));
});
  
router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});
  
module.exports = router;