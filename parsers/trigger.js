var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    exec = require('child_process').exec,
    request = require('request');


var app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());

var router = express.Router();
app.use('/trigger', router);


router.get('/vkparser/:wallid/:from/:to', function (req, res) {
    exec('casperjs vk/vkparser2.0.js ' + req.params.wallid + ' ' + req.params.from + ' ' + req.params.to, {},
        function (err, stdout, stderr) {
            if (err) {
                throw err;
            }

            var options = {
                uri: "https://api.vk.com/method/wall.getById?posts=" + JSON.parse(stdout) + "&access_token=3330abc53330abc5338cbd53bf337693d6333303330abc56b8218aba6875d65ba4e6e34&v=5.75",
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10
            };

            request(options, function (error, response, body) {
                var obj = JSON.parse(body).response;
                res.send(obj);

                //request({
                //    method: "POST",
                //    uri: 'http://localhost:8080/yf-services/rest/vk/putposts',
                //    json: obj
                //});

            });

        });
});

router.get('/vkparser/:wallid/new', function (req, res) {


    var url = 'http://localhost:9091/trigger/vkparser/pictures/all';
    var newPosts = [];

    request(url, function (err, response, body) {
        if (err) {
            console.log(err);
            return;
        }

        var chunk = JSON.parse(body);

        exec('casperjs vk/vkparser.js ' + req.params.wallid + ' ' + 0 + ' ' + 1, {},
            function (err, stdout, stderr) {
                if (err) {
                    throw err;
                }
                var obj = JSON.parse(stdout);
                obj.forEach(function (post, i, arr) {

                    if (!(chunk.indexOf(post.postId.replace('/post-', "").replace('/wall-', "")) > -1)) {
                        newPosts.push(post);
                    }
                })

                for (var i = newPosts.length - 1; i > 0; i--) {
                    new vkPanding(newPosts[i]).save(function (e) {
                        console.log(newPosts[i]);
                    });
                }

                res.send(obj);
            });
    })

});

router.get('/vkparser/testold', function (req, res) {
    exec('casperjs vk/vkparser_old.js https://vk.com/youngfolks public 0 20', {},
        // exec('casperjs backend/vkparser.js https://vk.com/' + req.params.page + ' ' + req.params.type + ' ' + req.params.from + ' ' + req.params.to,{},
        function (err, stdout, stderr) {
            if (err) {
                throw err;
            }

            var obj = JSON.parse(stdout);
            request({
                method: "POST",
                uri: 'http://localhost:8080/yf-services/rest/vk/putposts',
                json: obj
            });
            res.send(obj);
        });
});


app.listen(9091);
console.log("running trigger on 9091");
