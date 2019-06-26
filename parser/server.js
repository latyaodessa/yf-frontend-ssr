'use strict';

const {By} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request');

const PORT = process.env.PORT || 8080;


const app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());

const router = express.Router();
app.use('/trigger', router);


router.get('/vkparser/:wallid/:from/:to', async function (req, res) {

    const ids = await getIdsFromVk(req.params.wallid, req.params.from, req.params.to);

    const options = {
        uri: "https://api.vk.com/method/wall.getById?posts=" + ids + "&access_token=3330abc53330abc5338cbd53bf337693d6333303330abc56b8218aba6875d65ba4e6e34&v=5.75",
        method: "GET",
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    };

    request(options, function (error, response, body) {
        const obj = JSON.parse(body).response;
        res.send(obj);

    });
});

async function getIdsFromVk(wallId, from, to) {
    let driver = new webdriver.Builder()
        .forBrowser('firefox')
        .usingServer('http://selenium-hub:4444/wd/hub')
        .build();

    // http://selenium-hub:4444/grid/api/hub
    try {
        await driver.get(`https://vk.com/wall-${wallId}?offset=${from}&own=${to}`);

        const linksDoms = await driver.findElements(By.xpath('//a[@class="post_link"]'));
        const links = await Promise.all(linksDoms.map(dom => dom.getAttribute("href")));
        const ids = await Promise.all(links.map(link => link.replace(/.+?(?=-)/g, '')));

        return ids.join(',');

    } finally {
        await driver.quit();
    }
}


app.listen(PORT);
console.log("running trigger on " + PORT);
