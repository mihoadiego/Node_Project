const dotenv = require('dotenv');
dotenv.config();

exports.port = process.env.PORT;

exports.apiUrl = process.env.API_URL;

// module.exports = {
//   apiUrl: process.env.API_URL,
//   port: process.env.PORT
// };