var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    exec = require('child_process').exec,
    mongoose = require('mongoose'),
    path = require('path'),
    async = require('async'),
    request = require('request'),
    cron = require('node-cron');



var app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());

var router = express.Router();
app.use('/cronjob', router);
var e = 0;
cron.schedule('* * * * *', function(){
    url = 'http://localhost';
    request(url, function (err, response, body) {
        if (err) {
            console.log(err);
            return;
        }

        var chunk = JSON.parse(body);

    })

    });

app.listen(9090);
console.log("running CRONJOB on 9090");