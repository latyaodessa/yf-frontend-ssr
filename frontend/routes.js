const routes = module.exports = require('next-routes')();

routes
    .add('index')
    .add('native')
    .add('sets')
    .add('art')
    .add('dashboard')
    .add('profile')
    .add('post', '/post/:postId')
