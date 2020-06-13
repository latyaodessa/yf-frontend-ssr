const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(function (req, res, next) {
    if (req.method === 'POST') {
        req.method = 'GET';
        req.query = req.body
    }
    // Continue to JSON Server router
    next()
});

server.post('/wp-json/mobile/products', function (req, res, next) {
    req.method = 'GET';
    req.query = req.body;
    req.originalUrl = "/products";
    next();
});


server.use(middlewares);
server.use(router);
server.listen(8888, () => {
    console.log('JSON Server is running 8888')
});
