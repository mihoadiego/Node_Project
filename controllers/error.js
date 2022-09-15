/**
 * path and rootDir mandatory if not using templating (ie if only using sendFile methods to redirect to .html files)
 * important if not using templating
 *      path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 *      path.join() handles efficiently both linux + windows + mac path syntaxes! / VS \ and makes it possible to use ../ to go one level up for example
 */
 const path = require('path')
 const rootDir = require('../utils/path')


exports.get_Controller_404error = (req, res, next) => {
/**
 * if not using templating , (ie without ejs), an html file /views/404.html is required and will be rendered thanks to sendFile and path.join() 
 * path is used to be able to read file directories in this app, and then redirect to such files to provide our routes responses
 */
//res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); // no need to use './utils/path here' as we directly are at the root

/**
 * if using templating with ejs, we will take advantage of .render() method, 
 * ... that first tell which template to use (confere app.set('view engine') + app.set('views') here above) (here 404 in /views/404.ejs )
 * ... and secondly the props/variables to pass to such templating
 */
    res.status(404).render('404', { pageTitle: 'Page Not Found my friend', path:'/404' });
};