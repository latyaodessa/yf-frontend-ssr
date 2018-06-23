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
    port: 465,
    secure: true,
    auth: {
        user: 'noreply@youngfolks.ru',
        pass: 'o6Ll6hY1T0jS'
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
            res.send(false);
        }
        res.send(true);

    });
});


app.listen(8081);
console.log("running trigger on 8081");



