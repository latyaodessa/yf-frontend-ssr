'use strict';

const next = require('next');
const routes = require('./routes');
const app = next({dev: process.env.NODE_ENV !== 'production'});
const handler = routes.getRequestHandler(app);
var bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const express = require('express');

let expr = express();

expr.use(bodyParser.json());
expr.use(bodyParser.xml({
    xmlParseOptions: {
        normalize: true,
        normalizeTags: true,
        explicitArray: false
    }
}));

app.prepare().then(() => {
    expr.use(handler).listen(3000)
});

const options = {
    root: __dirname + '/static/',
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
    }
};
expr.get('/robots.txt', (req, res) => (
    res.status(200).sendFile('robots.txt', options)
));

expr.get('/sitemap.xml', (req, res) => (
    res.status(200).sendFile('sitemap.xml', options)
));

expr.post('/sitemap', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
});
