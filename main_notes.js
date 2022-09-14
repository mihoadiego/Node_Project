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
 */