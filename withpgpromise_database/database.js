/**
 * ==============================================================================
 *                          STEP 1 : SET PG PROMISE OPTIONS 
 * ==============================================================================
 */
const queryLogger = (e) =>{
    let {query} = e;
    query = query.replace('\n', '');
    // query = query.replace(/\s+/g, '');
    query = `${query};`;
    console.log('SQL QUERY: ', query);
};

const onNotice = notice => console.log(`PERSONALIZED NOTICE: ${notice.message}`);

const pgPromiseOptions = {
    capSQL:true,
    connect: (client) => {
        client.removeListener('notice', onNotice);
        client.on('notice', onNotice);
    },
    query: queryLogger,
};

/**
 * ==============================================================================
 *                           STEP 2 : INITIALIZE PG PROMISE 
 * ==============================================================================
 */
const pgp = require('pg-promise')(pgPromiseOptions)



/**
 * ==============================================================================
 *                          STEP 3 : PREPARE ACCESS TO ./sql files 
 *                               along the complete webservice
 * ==============================================================================
 */
const querySqlFullPath = (fullPath, params) => new pgp.QueryFile(fullPath, {minify: true, debug: true, params});
exports.sql = pgp.utils.enumSql(`${__dirname}/sql`, {recursive: true}, file => querySqlFullPath(file));




/**
 * ==============================================================================
 *                          STEP 4 : PREPARE CONTEXT AND SETTINGS 
 *                            (PASSWORD, HOST, PORT...) FOR PGP
 * ==============================================================================
 */
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


/**
 * ==============================================================================
 *                          STEP 5 :  EXPORT PGP INSTANCE AS db variable
 * ==============================================================================
 */
exports.db = pgp(cn /* dbConnectionDetails*/)
