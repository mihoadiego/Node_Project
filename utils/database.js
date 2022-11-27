const { Sequelize } = require("sequelize");
const { hostDb, nameDb, userDb, passwordDb} = require('../config') 

const sequelize = new Sequelize(
    nameDb, 
    userDb, 
    passwordDb, 
    {
        dialect: "postgres", 
        host: hostDb
    }
);

module.exports = sequelize;