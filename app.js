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
 * templating to render our static html files with ejs here, thanks to app.set (to set a global configraution value).  
 * =================================================================================================================  
 */
app.set('view engine', 'ejs')   //  'view engine' arg: generic arg to tell which templating engine to use
app.set('views', 'views')       // 'views' arg: generic arg to tell where to find those templating models


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
 * Allow static files 'reading'. For example to make href link work in  <Link ref='stylesheet href='/public/css/main.css' > in /views/404.html
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * import controllers methods that we be executed for default route (ie not defined routes, ie errors)
 */
 const {get_Controller_404error} = require('./controllers/error')

/**
 * =================================================================================================================
 * take advantages of express-router library
 * =================================================================================================================
 */
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
app.use('/admin',adminRoutes)
app.use(shopRoutes)
app.use(get_Controller_404error) // for all non defined routes


app.listen(port, ()=>{console.log(`server listening on port ${port}`)})