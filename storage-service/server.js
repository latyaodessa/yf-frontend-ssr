'use strict';
const express = require('express'),
    bodyParser = require('body-parser'),
    B2 = require('backblaze-b2'),
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    path = require('path'),
    sha1 = require('sha1'),
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    axios = require('axios'),
    qs = require('qs');

const Jimp = require("jimp");

const errors = require('./FileUploadErrors');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/* Use cors and fileUpload*/
app.use(cors());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

let router = express.Router();
app.use('/storage', router);

const ACCOUNT_ID = "b0e712168300";
const APP_KEY = "002e882d72dcd720004bf5e2ce2dec740da06492e5";


let b2 = new B2({
    accountId: ACCOUNT_ID,
    applicationKey: APP_KEY
});


async function getUploadUrl(bucketId) {
    try {
        await b2.authorize();
        return await b2.getUploadUrl(bucketId);
    } catch (e) {
        console.log('Error:', e)
    }
}

router.post('/upload/profile', async (req, res, next) => {

    if (!req.files && !req.files.file) {
        return res.status(500).send(errors.BASIC_ERROS.NO_FILE);
    }

    let imageFile = req.files.file;
    let extention = imageFile.name.split('.').pop();
    let editedFile = await convertProfilePic(imageFile);
    let bufferFile = await editedFile.getBuffer(Jimp.MIME_JPEG, (err, result) => {
        return result;
    });
    console.log(req);


    const bucketId = "bb504ed77162819668430010";
    const uploadUrl = await getUploadUrl(bucketId);

    try {
        const upload = await b2.uploadFile({
            uploadUrl: uploadUrl.data.uploadUrl,
            uploadAuthToken: uploadUrl.data.authorizationToken,
            filename: req.body.userId + ".jpeg",
            data: bufferFile,
            onUploadProgress: function (event) {
                console.log(event);
            }
        });
        console.log(upload.data);
        res.json(upload.data);
    } catch (e) {
        console.log('Error upload:', e);
        return res.status(500).send(e);
    }

});

async function convertProfilePic(img) {
    return await Jimp.read(img.data).then(function (image) {
        return image.resize(Jimp.AUTO, 400)
            .quality(90);
    }).then().catch(function (err) {
        console.log(err);
    });
}


app.listen(8080);
console.log("running trigger on 8080");



