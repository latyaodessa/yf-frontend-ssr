'use strict';

const next = require('next');
const routes = require('./routes');
const app = next({dev: process.env.NODE_ENV !== 'production'});
const handler = routes.getRequestHandler(app);
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

const fs = require('fs'),
    parseString = require('xml2js').parseString,
    xml2js = require('xml2js');


const express = require('express');

let expr = express();

expr.use(bodyParser.json({limit: '50mb'}));
expr.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

expr.get('/googlee97847b6446f2225.html', (req, res) => (
    res.status(200).sendFile('googlee97847b6446f2225.html', options)
));
expr.get('/yandex_f923a12f5940f7a4.html', (req, res) => (
    res.status(200).sendFile('yandex_f923a12f5940f7a4.html', options)
));

expr.get('/.well-known/pki-validation/E2614052870FBC9733FFDA272E094F14.txt', (req, res) => (
    res.status(200).sendFile('pki-validation/E2614052870FBC9733FFDA272E094F14.txt', options)
));

expr.get('/robots.txt', (req, res) => (
    res.status(200).sendFile('robots.txt', options)
));

expr.get('/sitemap.xml', (req, res) => (
    res.status(200).sendFile('sitemap.xml', options)
));

expr.post('/sitemap', function (req, res) {
    const pathToSiteXml = "static/sitemap.xml";

    fs.readFile(pathToSiteXml, 'utf-8', function (err, data) {
        if (err) console.log(err);

        parseString(data, function (err, result) {
            if (err) console.log(err);

            let newSiteMap = result;

            req.body.forEach(url => {
                let existingUrl = result.urlset.url.find(ele => {
                    return ele.loc[0] === url.loc;
                });

                if (!existingUrl) {
                    newSiteMap.urlset.url.unshift(url);
                }

            });

            let builder = new xml2js.Builder();
            let xml = builder.buildObject(newSiteMap);

            fs.writeFile(pathToSiteXml, xml, function (err, data) {
                if (err) console.log(err);
                console.log("successfully updated SITEMAP");
            });


        });
        res.send('Request recieved');
    });
});
