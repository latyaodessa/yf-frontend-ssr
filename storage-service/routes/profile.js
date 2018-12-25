'use strict';
const B2 = require('backblaze-b2'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    rimraf = require('rimraf');

const config = require('./../config/config.json');

const Jimp = require("jimp");

const errors = require('./../FileUploadErrors');

module.exports = function (router) {



    let b2 = new B2({
        accountId: config.ACCOUNT_ID,
        applicationKey: config.APP_KEY
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


        const bucketId = config.PROFILE_BUCKET_ID;
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



    async function convertProfilePic(img) {
        return await Jimp.read(img.data).then(function (image) {
            return image.resize(Jimp.AUTO, 400);
            // .quality(90);
        }).then().catch(function (err) {
            console.log(err);
        });
    }


};
