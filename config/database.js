const { hostDb, nameDb, userDb, passwordDb} = require('../config') 


module.exports = {
    "development": {
      "username": userDb,
      "password": passwordDb,
      "database": nameDb,
      "host": hostDb,
      "dialect": "postgres",
      // "camelCase": false,
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
        // "camelCase": false,
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
        // "camelCase": false,
        "logging": false, // socket,
        "define": {
          "timestamps": false,
        }
    }
  }