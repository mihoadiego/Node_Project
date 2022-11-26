const dotenv = require('dotenv');
dotenv.config();

// GLOBAL
exports.port = process.env.PORT;

// DATABASE
exports.portDb = process.env.PORT_DB;
exports.hostDb = process.env.HOST_DB;
exports.nameDb = process.env.NAME_DB;
exports.userDb = process.env.USER_DB;
exports.passwordDb = process.env.PASSWORD_DB;
exports.maxCnDb = process.env.MAX_CONNECTION_DB;
exports.sslDb = process.env.SSL_DB;
exports.apiUrl = process.env.API_URL;


// module.exports = {
//   apiUrl: process.env.API_URL,
//   port: process.env.PORT
// };