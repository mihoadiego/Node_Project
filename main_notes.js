/**
 * ===========================================================================================================================================
 *                                                           MAIN PACKAGES
 * ===========================================================================================================================================
 * 
 * 
 * NODEMON ONLY FOR DEV ENVIRONMENT
 *          npm install nodemon --save-dev
 *              => and then update the package.json file to set the scripts to "start":"nodemon app.js"
 *
 * 
 * 
 * EXPRESS BOTH FOR DEV AND PROD ENVIRONMENTS
 *          npm install --save express
 * 
 * 
 * 
 * DOTENV TO HANDLE GLOBAL .ENV VARIABLES
 *          npm install dotenv --save
 *              => and then simply import such library in the file where we use a .env variable, like in the /config.js file below:
 *                      const dotenv = require('dotenv')
 *                      dotenv.config()
 *                      ...
 *                      const port = process.env.PORT
 *                      const url = process.env.API_URL
 * 
 *              => and in the .env file: 
 *                      PORT=3000  
 *                      API_URL=http://localhost:3000
 * 
 * 
 * BODY PARSER TO BE ABLE TO READ THE CONTENT OF THE REQ.BODY IN EXPRESS
 *          npm install --save body-parser
 *              => and then bodyParser = require('body-parser')
 *                  app.use(bodyParser.urlencoded({extended: false}))
 * 
 * 
 * 
 * 
 * TEMPLATING WITH THREE DIFFERENT AVAILABLE LIBRAIRIES :   EJS   PUG AND HANDLEBARS
 *          npm install --save ejs pug express-handlebars
 *              => we will use ejs finally. how ?
 *                  by adding into /app.js the following 
 *                      app.set('view engine', 'ejs');
 *                      app.set('views', 'views'); 
 *                  by then using the render() methods in our routes/admin.js and routes/shop.js file for example 
 *                  telling where to find the template as first arg, and one object containing all desired props as second arg
 *                      router.get('/', (req, res, next) => {
                            const products = adminData.products;
 *                          res.render('shop', {
 *                              prods: products, pageTitle: 'Shop', path: '/', hasProducts: products.length > 0, activeShop: true, productCSS: true
 *                          }) 
 *                      });
 *              some reminders about ejs
 * 
 *                  <% %> is executed without any problem into value    like <input value="<%if (editing) {%>" .... /> 
 *                  but to read variable (here product), within this string, we need to put an =   like    <%=product.title %> with an equal though     
 *                  and as a reminder, to read instruction like include, we need to put an -   like     <%-  %>  
 *                  and to do loops, we can for example do       <% for (let product of prods) { %>     
 * 
 * 
 * 
 * 
 * 
 * READ and uplaod FILES ... NOT IMPLEMENTED YET
 *          npm i --save multer         
 *              => we created a middleware in /middleware/fileUpload.js 
 *                      in which we imported multer and handle the multer
 *                      please not that we export the userFileUpload in such fileUpload.js file, by adding () at the end, 
 *                      why () at the end?  =>   to directly execute it once importing it! 
 *              => and then, /middleware/fileUpload.js has been written using multer.diskSotrage...
 *                      ... we can import it in our router and put it in the  dedicated 2nd param array => 
 *                      through router.post("/add-product", [USERFILEUPLOAD], post_Controller_AddProduct) 
 *                      the post_Controller_AddProduct is then called, coming from the /controllers/admin.js 
 *                      in which we take advantage of the actions led by the previous middleware executed (fileUpload...) 
 *                      to then do the logic.
 * 
 * MEMO: in express, req.query to get an object of all elements that are in a url after the ? ex:'localhost3000/cart?id=52222&reference=263'
 *     : in express, req.params to get an object of all elements that are specific in the route. ex: "localhost3000/cart/:id"
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ===================================================================================================================
 * ===================================================================================================================
 * 
 * CREATE A NEW DATABASE FROM TERMINAL: 
 *              sudo -u postgres psql
 *          after typing my password, an once connected to psql as sudo user, i tiped  
 *              CREATE DATABASE udemynodejstutorialdb;
 *          once database created, i then provided rights to 'mihoadie' user...
 *              GRANT ALL PRIVILEGES ON DATABASE udemynodejstutorialdb TO mihoadie; 
 * 
 *      reminder terminal command to connect to udemynodejstutorialdb as mihoadie user:
 *               psql -h localhost -d udemynodejstutorialdb -U mihoadie
 * 
 * 
 *      then connect such udemynodejstutorialdb Db to dbeaver 
 *      by simply opening dbeaver and go to base de données -> nouvelle connection --> choose PostgresSql, 
 *      and then fullfill all requested info 
 *               Host: localhost 
 *               port: 5432 
 *               Database: udemynodejstutorialdb
 *               Authentication: Database Native 
 *               Nom utilisateur: mihoadie 
 *               Mot de Passe: mypassword 
 *               (in other words the password that we provided when doing alter user mihoadie password 'mypassword' when intalling postgres) 
 * 
 * 
 * 
 * 
 * 
 * OPTION 1: WORK WITH PG PROMISE
 * 
 * PG PROMISE 
 *               npm install --save pg-promise
 *          
 *       then we created all the variables to connect efficiently, in the .env file ()
 *               PORT_DB= 5432
 *               HOST_DB=localhost
 *               NAME_DB=udemynodejstutorialdb
 *               USER_DB=mihoadie
 *               PASSWORD_DB=xxxxxxxx
 *               MAX_CONNECTION_DB=30
 *      
 *       then create a folder withpgpromise_database, in which we create a database.js file (node_project/withpgpromise_database/database.js) 
 *        to initialize all pg connections and customize a bit our pg promise (querylogger, sql files handling...)
 * 
 *       and finally import db and sql in our files to take profits of sql files {sql.} and pgp queries {db.} through the app
 * 
 * 
 * 
 * OPTION 2 : WORK WITH ORM LIKE SEQUELIZE
 *      * installing sequelize and sequelize cli and mandatory pg package
 *      npm i --save sequelize
 *      npm install -g sequelize-cli
 *      npm i --save pg 
 *
 *
 *      *understanding sequelize
 *      all config done into .sequelizerc
 * 
 *      * main command used after setting the config from .sequelizerc:
 *              // to initialize sequelize. Automatically created /models folder +  2 subfolder within database folder (migrations/seeders)
 *              // BE CAREFUL, AFTER running sequelize init,  sometimes the node_project/config/database.js file is overwritten automatically
 *              // thus keeping a copy to then change it back to our config values can be necessary
 *          sequelize init
 *              
 *              // then i generated my model
 *          sequelize model:create --name product --attributes title:string,price:double,image_url:string,description:string,is_active:boolean
 *             // then i went to node_project/database/migrations/20221127184135-create-product.js 
 *             // to modify a bit the table / columns (defaults values...)
 *             // and then i run my migration
 *          sequelize db:migrate  
 *          sequelize seed:create --name products
 *              // once seed create, i went to node_project/database/seeders/202221127184823-products.js to populate a bit the table
 *          sequelize db:seed:all
 * 
 * ===================
 *  IMPORTANT: need to add to each 'product MODEL query the 
 *          attributes: ['id', 'title', 'price', 'image_url', 'description', 'is_active', 'created_at', 'updated_at'], 
 * because I made mistake WHEN redoing a sequelize init --force a second time 
 * thus always requesting for createdAt unexisting column if not adding attributes throwing then an error 
 * ===================
 */