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
 * ==================================================================================================================
 * Allow static files 'reading'. For example to make href link work in  <Link ref='stylesheet href='/public/css/main.css' > in /views/404.html
 * ==================================================================================================================
 */
app.use(express.static(path.join(__dirname, 'public')));



/**
 * =================================================================================================================
 *  declare a global middleware
 * =================================================================================================================
 */
const sequelize = require('./utils/database');
const User = require('./models').user;

// set here a global middleware, that will be executed NOT WHEN npm starting , BUT ONLY WHEN a req is received by our app 
app.use((req, res, next) => {
        User.findOne({where:{id: 1}})
        .then(user => {
        // attach current user to every req objects. thus req.user is now accessible in every request received by ou app)
                console.log(user)
                req.user = user;
        next();
        })
        .catch(err => console.log(err))
});



/**
 * ==================================================================================================================
 * import controllers methods that we be executed for default route (ie not defined routes, ie errors)
 * ==================================================================================================================
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



/**
 * =================================================================================================================
 *  taking advantages of the sync method from sequelize customized instance from './utils/database'
 * =================================================================================================================
 */
sequelize
        .sync() // sync method having a look at all models being defined in our project (./models)
        .then(result => {
                return User.findAll({
                        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
                })
        })
        .then(users => {
              if(!users.length){
                return User.create({name: 'coco', email: 'coco@bongo.fr'});
              }  
              return users[0];
        })
        .then(user => {
                app.listen(port, ()=>{console.log(`server listening on port ${port}`)})
        })
        .catch(err=>{
                console.log(err)
        })

// app.listen(port, ()=>{console.log(`server listening on port ${port}`)}) // i commented app execution when i moved it to sequelize .then()




/**
 * =================================================================================================================
 * set up db tables when using sequelize manually, ie without running migration commands 
 * (thus it will create tables if not exist each time our app starts)
 * =================================================================================================================
 */
// const Product = require('./models/product');
// const User = require('./models/user');

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);

// sequelize
//   // .sync({ force: true })
//   .sync()
//   .then(result => {
//     return User.findById(1);
//     // console.log(result);
//   })
//   .then(user => {
//     if (!user) {
//       return User.create({ name: 'Max', email: 'test@test.com' });
//     }
//     return user;
//   })
//   .then(user => {
//     // console.log(user);
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);
//   });
