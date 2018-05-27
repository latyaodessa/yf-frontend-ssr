var casper = require('casper').create(
        {
            pageSettings: {
                webSecurityEnabled: false,
                loadImages:  false,
                loadPlugins: false
            }//,

             //verbose: true,
             // logLevel: "debug"
        }
    ),
    x = require('casper').selectXPath,
    AllPostsDetailsList = [];

var whichDB = casper.cli.get(0);

var url = 'http://www.vk.com/';

casper.start(url, function() {
    // search for 'casperjs' from google form
    //this.fillSelectors('form#index_login_form', {
    //    'input[id = index_email ]' : 'andreasfedorenko@gmail.com',
    //    'input[id = index_pass ]' : 'lat9lat9lat9'
    //}, false);
    //this.click('#index_login_button');
}).viewport(1600,1000);

//casper.then(function(){
//    this.wait(5000, function() {
//        this.capture("login.png");
//    });
//});


casper.then(function(){
    this.open('http://localhost:9091/trigger/vkparser/pictures/'+whichDB, {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    });
});

casper.then(function() {
    var pagesList = JSON.parse(this.getPageContent());
    this.each(pagesList, function (self, link) {

        self.thenOpen('https://vk.com/wall-'+link, function () {


            var aContext = [],
                postPhotoList = [],
                postPhotoDetails = new Object(),
                postDetailsList = [];

            var aContext = this.getElementsAttribute('.page_post_thumb_wrap','onclick');
            this.then(function(){

                aContext.forEach(function(post,i, arr){
                    var regex =  /'(.*?)'/;
                    var link = regex.exec(post)[1];
                    postPhotoList.push(link);

                });
            });
            postPhotoDetails["postDetailsId"] = link;
            postPhotoDetails["photosCount"] = aContext.length;

            this.then(function(){
                this.each(postPhotoList, function (photoself, photolink) {
                    photoself.thenOpen('https://vk.com/photo'+photolink, function () {

                        //this.mouse.move('a.pv_actions_more');

                        var tempPhotoObj = new Object();
                        tempPhotoObj["photoId"]= photolink;
                        tempPhotoObj["photoLikes"] = this.fetchText('.pv_like_count._count');
                        var photo =x("//a[@id='pv_photo']//img");
                        tempPhotoObj["photoBigLink"] = this.getElementAttribute(photo,'src');
                            //this.getElementAttribute('#pv_more_act_download','href');
                        postDetailsList.push(tempPhotoObj);

                        });
                })
            });
            this.then(function(){
                postPhotoDetails["postDetailsContent"] = postDetailsList;
                AllPostsDetailsList.push(postPhotoDetails);
            });




        });




    })
});

casper.then(function(){
    require('utils').dump(AllPostsDetailsList);

});

casper.run(function(){
    this.exit();

});