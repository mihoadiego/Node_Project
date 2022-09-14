const path = require('path');
/**
 * important
 *      path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 *      path.join() handles efficiently both linux + windows + mac path syntaxes! / VS \ and makes it possible to use ../ to go one level up for example
 *      such helper function path.dirname(require.main.filename) will get the root of the project
 */

module.exports = path.dirname(require.main.filename);