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
 *              sudo -u postgres createdb udemynodejstutorialdb
 * 
 *      without forgetting to connect as sudo afterwards, to postgres, to then grant all privilegies to postgres' user 'mihoadie'
 *               sudo -u postgres psql 
 *               GRANT ALL PRIVILEGES ON DATABASE udemynodejstutorialdb TO mihoadie; 
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
 * 
 * 
 * 
 * 
 * 
 */