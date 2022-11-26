const pgp = require('pg-promise')(/* options */)
const { hostDb, portDb, nameDb, userDb, passwordDb, maxCnDb} = require('../config') 

const cn = {
    host: hostDb, 
    port: portDb, 
    database: nameDb, 
    user: userDb, 
    password: passwordDb, 
    max: maxCnDb,
    // https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
}

exports.db = pgp(cn /* dbConnectionDetails*/)
