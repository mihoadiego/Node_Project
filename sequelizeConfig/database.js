const { hostDb, nameDb, userDb, passwordDb} = require('../config') 


module.exports = {
    "development": {
      "username": userDb,
      "password": passwordDb,
      "database": nameDb,
      "host": hostDb,
      "dialect": "postgres",
      "logging": false // socket
    },
    "test": {
        "username": userDb,
        "password": passwordDb,
        "database": nameDb,
        "host": hostDb,
        "dialect": "postgres",
        "logging": false // socket
    },
    "production": {
        "username": userDb,
        "password": passwordDb,
        "database": nameDb,
        "host": hostDb,
        "dialect": "postgres",
        "logging": false // socket
    }
  }