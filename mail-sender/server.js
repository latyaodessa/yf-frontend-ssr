'use strict';
const nodemailer = require('nodemailer'),
    express = require('express'),
    bodyParser = require('body-parser');

let app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());
let router = express.Router();
app.use('/rest', router);


let smtpConfig = {
    host: 'mail.adm.tools',
    port: 2525,
    secure: false,
    auth: {
        user: 'noreply@youngfolks.ru',
        pass: 'bHoWlEVczy'
    },
    tls: {
        rejectUnauthorized: false
    }
};


let transporter = nodemailer.createTransport(smtpConfig);


router.post('/send', function (req, res) {

    let mailOptions = {
        from: req.body.from,
        to: req.body.to.toString(),
        subject: req.body.subject,
        text: req.body.text,
        html: req.body.html
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({error: error});
        }
        res.status(200).send(info);

    });
});


app.listen(8080);
console.log("running trigger on 8080");



