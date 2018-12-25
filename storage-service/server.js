'use strict';
const express = require('express'),
    bodyParser = require('body-parser'),
    B2 = require('backblaze-b2'),
    mkdirp = require('mkdirp'),
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    fs = require('fs'),
    rimraf = require('rimraf');

const PORT = process.env.PORT || 8080;

const Jimp = require("jimp");

const errors = require('./FileUploadErrors');

let app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
/* Use cors and fileUpload*/
app.use(cors());
app.use(fileUpload());


let router = express.Router();
app.use('/storage', router);
require('./routes')(router);



app.listen(PORT);
console.log("running trigger on " + PORT);



