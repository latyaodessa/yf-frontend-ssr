'use strict';
const express = require('express'),
    bodyParser = require('body-parser'),
    B2 = require('backblaze-b2'),
    mkdirp = require('mkdirp'),
    cors = require('cors'),
    fileUpload = require('express-fileupload'),
    fs = require('fs');

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
        return res.status(500).sendStatus(errors.BASIC_ERROS.NO_FILE);
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
        return res.status(500).sendStatus(e);
    }

});

router.get('/uploads/:userId/:uuid/:file', (req, res) => {
    const options = {
        root: __dirname + `/uploads/${req.params.userId}/${req.params.uuid}/`,
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
        }
    };
    res.status(200).sendFile(req.params.file, options);
});

router.get('/user/uploads/:userId/:uuid/', async (req, res) => {
    const dirPath = __dirname + `/uploads/${req.params.userId}/${req.params.uuid}/`;
    const files = fs.readdirSync(dirPath);
    const formatedFiles = await files.map(file => {
        return {name: file, loadCounter: 100, uploaded: true}
    });
    res.json(formatedFiles);
});

router.post('/submission/pic/:userId/:uuid', async (req, res, next) => {

    if (!req.files && !req.files.file) {
        return res.status(500).sendStatus(errors.BASIC_ERROS.NO_FILE);
    }
    let imageFile = req.files.file;

    const dirPath = `${__dirname}/uploads/${req.params.userId}/${req.params.uuid}`;

    mkdirp(dirPath, async err => {
        if (err) console.error(err);
        else {
            await fs.writeFile(`${dirPath}/${imageFile.name}`, imageFile.data, err => {
                if (err) {
                    return console.log(err);
                }
                res.sendStatus(200);
                console.log(`Saved! ${dirPath}/${imageFile.name}`);
            });
        }
    });


});

router.delete('/submission/pic/:userId/:uuid', async (req, res, next) => {

    await fs.unlink(`${__dirname}/uploads/${req.params.userId}/${req.params.uuid}/${req.query.fileName}`, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        res.sendStatus(200)
    });


});

async function convertProfilePic(img) {
    return await Jimp.read(img.data).then(function (image) {
        return image.resize(Jimp.AUTO, 400);
        // .quality(90);
    }).then().catch(function (err) {
        console.log(err);
    });
}


app.listen(8081); //TODO
console.log("running trigger on 8080");



