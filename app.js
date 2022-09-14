/**
 * =================================================================================================================
 * take benefits of .env file and a config file, containing all variables like port... => thanks to dotenv library
 * =================================================================================================================
*/
const { port } = require('./config') 
/**
* =================================================================================================================
 * be able to read file directories in our app => thanks to the standard path library
 * =================================================================================================================
 */
const path = require('path')
/**
 * =================================================================================================================
 * create an express app => thanks to the express library
 * =================================================================================================================
*/
const express = require('express')
const app = express()

/**
 * =================================================================================================================
* take benefits of the bodyparser library to read req.body easily
 * =================================================================================================================
*/
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

/**
 * =================================================================================================================
* create server => thanks to standard http library (not needed with Express, except if use of sockets for example)
 * =================================================================================================================
*/
        // const http = require('http')
        // const server = http.createServer(app)
        // server.listen(port, ()=>{console.log(`server listening on port ${port}`)})

/**
 * =================================================================================================================
 * take advantages of express-router library
 * =================================================================================================================
 */

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
app.use('/admin',adminRoutes)
app.use(shopRoutes)
app.use((req, res, next) =>{res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));}) // no need to use './utils/path here' as we directly are at the root

app.listen(port, ()=>{console.log(`server listening on port ${port}`)})