const routes = module.exports = require('next-routes')();

routes
    .add('index')
    .add('native')
    .add('sets')
    .add('art')
    .add('exclusive')
    .add('dashboard')
    .add('profile')
    .add('post', '/post/:postId')
    .add('pub', '/pub/:link')
    .add({name: 'submission', pattern: '/submission', page: 'submission'})
    .add({name: 'submission_uuid', pattern: '/submission/:uuid', page: 'submission'})
    .add({name: 'terms_pub', pattern: '/terms/publication', page: 'terms'})
    .add({name: 'auth', pattern: '/auth', page: 'auth'})
    .add({name: 'reset', pattern: '/reset/:uuid', page: 'auth'})
    .add({name: 'verify', pattern: '/verify/:uuid', page: 'verify'});
