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
 *      examples of pg promise files found in maualModelManagement/models/product.js
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
 *      all config done into .sequelizerc (sequelizerc then refering in its content to a config/database.js file)
 *         such config file, for postgres, should contain define params setting timestamps: false
 *          this will prevent a lot of errors with createdAt automatic sets by sequelize, that do not apply here in postgress
 *          ex below of such config/database.js file content called within .sequelizerc
 * 
                        *   "development": {
                            "username": userDb,
                            "password": passwordDb,
                            "database": nameDb,
                            "host": hostDb,
                            "dialect": "postgres",
                            "logging": false, // socket,
                            "define": {
                                "timestamps": false,
                            }
                            },
                            "test": {
                                "username": userDb,
                                "password": passwordDb,
                                "database": nameDb,
                                "host": hostDb,
                                "dialect": "postgres",
                                "logging": false, // socket
                                "define": {
                                "timestamps": false,
                                }
                            },
                            "production": {
                                "username": userDb,
                                "password": passwordDb,
                                "database": nameDb,
                                "host": hostDb,
                                "dialect": "postgres",
                                "logging": false, // socket,
                                "define": {
                                "timestamps": false,
                                }
                            }
 * 
 * 
 * 
 * 
 * 
 *      * main command used after setting the config from .sequelizerc:
 *              //          sequelize init
 *              // to initialize sequelize. Automatically created /models folder +  2 subfolder within database folder (migrations/seeders)
 *              // BE CAREFUL, AFTER running sequelize init,  sometimes the node_project/config/database.js file is overwritten automatically
 *              // thus keeping a copy to then change it back to our config values can be necessary
 *         
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
 * 
 *           then, once a migration has been set for products, i created a new migration to create a new model called user.
 *          that has created a 'users' table in db (do remember that sequelize then pluralize model' name in the DB tables)
 *          i also generated a new seeder to populate a bit this 'users' table ( thus 'user' model)
 *          and then i created a new migration names add-first-associations to create new columns into 'products' table, named user_id
 *          why?
 *          because i then added to the product model an association 'belongsto' (confere node_project/models/product.js) 
 *          and such column will then be necessary to link users to products
 *          i then also added to the user model just created an association 'hasmany' 
 *          (conf node_project/models/user.js). even if no columns to be created yet, important to mention this relation too 
 *
 *          i only had one problem: after creating the add-first-associations migration (with command sequelize migration:generate --name add-first-associations)
 *          i have been modifying the associated file in node_project/database/migrations/20230122134048-add-first-associations.js
 *          i first wanted to name the new products'table column 'user_id'. but when doing so, always sending error as user_id is automatically
 *          converted to userId in sequelize! thus, when trying to add a product, it generated error saying 'returning userId ' with userId not existing!
 *          thus i made a   
 *                  sequelize db:migrate:undo  , 
 *          then modified to userId, and now it works after redoing          
 *                  sequelize db:migrate      
 * 
 *          and i then modified a bit the app.js file to take advantage of the sequelize.sync method when starting the app, 
 *          (sequelize being as a reminder the Sequelize instance configurated in /home/hoareau/workspace/Node_Project/utils/database.js
 *          it is also there that i declared a global middleware, catched for every single request received by our app, 
 *          that will attach to every req a user key
 *          such user key will be the sequelize instance of our user found by its id (findByPk())
 * 
 * 
 * 
 * 
 * ===================
 *  IMPORTANT: need to add to each 'product MODEL query the 
 *          attributes: ['id', 'title', 'price', 'image_url', 'description', 'is_active', 'created_at', 'updated_at'], 
 * because I made mistake WHEN redoing a sequelize init --force a second time 
 * thus always requesting for createdAt unexisting column if not adding attributes throwing then an error 
 * 
 * BUT at the end i fixed the error by adding 'define{timestamps: false}' the listed options of  config/database.js file 
 * such file config/database.js  being called by .sequelizerc
 * 
 * ===================
 * TO READ TOO:
 * 
 * IN node_project/models/product.js, such code was generated by making initialisation directly with the migrations commands executed above.
 * migration commands  also created node_project/models/index.js
 *      but there is another way to define the models (manually), which is what i have not done due to timestamp issue if setting it manually. 
 *      To do manually,simply modify a bit the app.js file (conf comments in that app.js file)
 *      In addition, we will have to comment models/product.js and models/index.js files. the models/product.js ' content should be replaced then 
 *      with the content commented in such file 
 *      And also we will have to comment the Product instance declaration from node_project/controllers/admin.js
                        // const Product = require('../models').product; 
 *          to be modified to:   const Product = require ('../models/product')
 * 
 * 
 * ====================
 * IMPORTANT TO READ TOO
 * 
 *      SEQUELIZE is magic, beacause once our associations are defined, we can easily take advantages of Special methods/mixins added to instances
 *      conf https://sequelize.org/docs/v6/core-concepts/assocs/    and got o the end, where they speak about 'Special methods/mixins added to instances
 *      for example, in the /controllers/admin.js file, in the post_AdminController_AddProduct() controller, we use one of those
 *      by doing req.user.createProduct() ! cause a user has many products and a product belongs to users!
 *      we could have done the same to get products from a specific user in the get_AdminController_EditProduct() by calling for example 
 *         req.user.getProducts({where:{id: productId}})
 * 


 */