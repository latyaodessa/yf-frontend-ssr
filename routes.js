const routes = module.exports = require('next-routes')();

routes
    .add('index')
    .add('native')
    .add('sets')
    .add('art')
    .add('dashboard')
    .add('post', '/post/:postId')
