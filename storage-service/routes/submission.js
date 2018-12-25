'use strict';
const B2 = require('backblaze-b2'),
    mkdirp = require('mkdirp'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    archiver = require('archiver');

const config = require('./../config/config.json');


const Jimp = require("jimp");

const errors = require('./../FileUploadErrors');

const rootDir = __dirname + "/..";

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

    function zipDirectory(source, fileName) {
        const archive = archiver('zip', {zlib: {level: 9}});
        const stream = fs.createWriteStream(fileName);

        return new Promise((resolve, reject) => {
            archive
                .directory(source, false)
                .on('error', err => reject(err))
                .pipe(stream)
            ;

            stream.on('close', () => resolve());
            archive.finalize();
        });
    }

    router.get('/submission/images/zip/:userId/:uuid/:zipName', async (req, res, next) => {


        const source = rootDir + `/uploads/${req.params.userId}/${req.params.uuid}/`;

        const zipPath = `${rootDir}/uploads/zips/`;
        const zipName = `${req.params.zipName}.zip`;

        mkdirp(zipPath, async err => {
            if (err) console.error(err);
            else {
                console.log(source);

                console.log(zipPath + zipName);

                zipDirectory(source, zipPath + zipName).then((pr) => {
                    console.log(pr);
                });

                const options = {
                    root: zipPath,
                    headers: {
                        'Content-Type': 'application/zip'
                    }
                };
                res.status(200).sendFile(zipName, options);
            }
        });
    });


    router.post('/publication/upload/images', async (req, res, next) => {

        // if (!req.files && !req.files.file) {
        //     return res.status(500).sendStatus(errors.BASIC_ERROS.NO_FILE);
        // }

        // let imageFile = req.files.file;
        // let extention = imageFile.name.split('.').pop();
        // let editedFile = await convertProfilePic(imageFile);
        // let bufferFile = await editedFile.getBuffer(Jimp.MIME_JPEG, (err, result) => {
        //     return result;
        // });
        // console.log(req);
        //
        //
        // const bucketId = config.PROFILE_BUCKET_ID;
        // const uploadUrl = await getUploadUrl(bucketId);
        //
        // try {
        //     const upload = await b2.uploadFile({
        //         uploadUrl: uploadUrl.data.uploadUrl,
        //         uploadAuthToken: uploadUrl.data.authorizationToken,
        //         filename: req.body.userId + ".jpeg",
        //         data: bufferFile,
        //         onUploadProgress: function (event) {
        //             console.log(event);
        //         }
        //     });
        //     console.log(upload.data);
        //     res.json(upload.data);
        // } catch (e) {
        //     console.log('Error upload:', e);
        //     return res.status(500).sendStatus(e);
        // }

        const options = {
            root: rootDir + `/uploads/${req.params.userId}/${req.params.uuid}/`,
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
            }
        };
        res.status(200).sendFile(req.params.file, options);

    });


    router.get('/uploads/:userId/:uuid/:file', (req, res) => {
        const options = {
            root: rootDir + `/uploads/${req.params.userId}/${req.params.uuid}/`,
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
            }
        };
        res.status(200).sendFile(req.params.file, options);
    });

    router.get('/user/uploads/:userId/:uuid/', async (req, res) => {
        const dirPath = rootDir + `/uploads/${req.params.userId}/${req.params.uuid}/`;
        if (fs.existsSync(dirPath)) {
            const files = fs.readdirSync(dirPath);
            const formatedFiles = await files.map(file => {
                return {name: file, loadCounter: 100, uploaded: true}
            });
            res.json(formatedFiles);
        } else {
            res.json([]);
        }

    });

    router.post('/submission/pic/:userId/:uuid', async (req, res, next) => {

        if (!req.files && !req.files.file) {
            return res.status(500).sendStatus(errors.BASIC_ERROS.NO_FILE);
        }
        let imageFile = req.files.file;

        const dirPath = `${rootDir}/uploads/${req.params.userId}/${req.params.uuid}`;

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

        await fs.unlink(`${rootDir}/uploads/${req.params.userId}/${req.params.uuid}/${req.query.fileName}`, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }

            res.sendStatus(200)
        });


    });


    router.post('/clean', async (req, res, next) => {

        await rimraf(`${rootDir}/uploads/zips`, function () {
            console.log('cleaned zips');
        });

        if (!req.body) {
            return res.status(500).sendStatus(errors.BASIC_ERROS.NO_FILE);
        }

        await Object.keys(req.body).forEach(async (uuid) => {
            const userId = req.body[uuid];

            await rimraf(`${rootDir}/uploads/${userId}/${uuid}`, function () {
                console.log('cleaned ' + userId + " " + uuid);
            });

        });


        res.sendStatus(200)


    });


};
