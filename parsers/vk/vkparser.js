var casper = require('casper').create(
        {
            pageSettings: {
                webSecurityEnabled: false,
                loadImages:  false,
                loadPlugins: false
            },
            // verbose: true,
            //logLevel: "debug"
        }
    ),
    x = require('casper').selectXPath;

//casper.start(function(){}).viewport(1600,1000);
var url = "http://www.vk.com"
casper.start(url, function() {
    this.fillSelectors('form#quick_login_form', {
        'input[id = quick_email ]' : 'andreasfedorenko@gmail.com',
        'input[id = quick_email ]' : 'lat9lat9lat9'
    }, false);
    this.click('#quick_login_button');
}).viewport(1600,1000);

var wallId = casper.cli.get(0),
    firstPageSet = casper.cli.get(1),
    lastPageSet = casper.cli.get(2);

var publicPageFirstPart = 'https://vk.com/wall-'+ wallId +'?offset=',
    publicPageLastPart = '&own=1',
    pagesList =[],
    buildedObject = [],
    contextVariables = [],
    newline = /<br\s*[\/]?>/gi,
    regex = /(<([^>]+)>)/ig;



var currentPage = function(publicPageFirstPart, pageSet ,publicPageLastPart){
    return publicPageFirstPart+pageSet+publicPageLastPart;
        };

    casper.thenOpen(currentPage(publicPageFirstPart,firstPageSet, publicPageLastPart));

casper.then(function(){
    for (;firstPageSet <= lastPageSet; firstPageSet += 20) {
            pagesList.push(currentPage(publicPageFirstPart,firstPageSet, publicPageLastPart));
    }
});


casper.then(function() {
    var i = 0;
    this.each(pagesList, function (self, link) {
        self.thenOpen(link, function () {

            this.capture("test.png");
            contextVariables = [];
            this.then(function(){

            contextVariables["postIds"] =  this.getElementsAttribute('.post_link', 'href');

            if (checkTagExist('.wall_post_text')) {
                contextVariables["postTexts"] = this.getElementsInfo('.wall_post_text').map(function (a) {
                    return a.tag;
                });
            }
            if (checkTagExist('.wall_signed_by')) {
                contextVariables["postAuthors"] =  this.getElementsInfo('.wall_signed_by').map(function (a) {
                    return a.text;
                });
            }
                if (checkTagExist(x("//span[contains(@class,'post_like_count _count')]"))) {
                    contextVariables["postLikes"] = this.getElementsInfo(x("//span[contains(@class,'post_like_count _count')]")).map(function (a) {
                        return a.text;
                    });
                }
                if (checkTagExist(x("//span[contains(@class,'post_share_count _count')]"))) {
                    contextVariables["postShares"] =  this.getElementsInfo(x("//span[contains(@class,'post_share_count _count')]")).map(function (a) {
                        return a.text;
                    });
                }
                contextVariables["postDateTime"] = this.getElementsInfo(x("//a/span[contains(@class,'rel_date')]")).map(function (a) {return a.text;});

                // always last
                contextVariables["postInfo"] = this.getElementsInfo('.post_info').map(function (a) {return a.tag;}); // context checker

            });


            this.then(function(){
                //require('utils').dump(contextVariables.postInfo);

                build(contextVariables, function(obj) {
                    for(var key in obj)
                        buildedObject = buildedObject.concat(obj[key]);

                })
            })
        });
    });
});


casper.then(function(){
    stdout(buildedObject);
});

var build = function(contextVariables,callback){
    var obj = [],
        postTextMinusCounter = 0, postAuthorMinusCounter=0, postLikesMinusCounter = 0, postSharesMinusCounter = 0;

    for(var i = 0; i < contextVariables.postIds.length; i ++ ){
        var tempObj = {};
        tempObj["postId"] = contextVariables.postIds[i];
        if(checkContentExist(contextVariables.postInfo[i], contextVariables.postTexts[i-postTextMinusCounter], i)) {
            tempObj["postText"] = contextVariables.postTexts[i-postTextMinusCounter].replace(newline," ").replace(regex,"");
        } else {  postTextMinusCounter++; tempObj["postText"] = "";}

        if(checkContentExist(contextVariables.postInfo[i], contextVariables.postAuthors[i-postAuthorMinusCounter], i)) {
            tempObj["postAuthor"] = contextVariables.postAuthors[i-postAuthorMinusCounter];
        } else {  postAuthorMinusCounter++ ; tempObj["postAuthors"] = "";}

        if(checkContentExist(contextVariables.postInfo[i], contextVariables.postLikes[i-postLikesMinusCounter], i)) {
            tempObj["postLikes"] = contextVariables.postLikes[i-postLikesMinusCounter];
        } else {  postLikesMinusCounter++; tempObj["postLikes"] = "";}

        if(checkContentExist(contextVariables.postInfo[i], contextVariables.postShares[i-postSharesMinusCounter], i)) {
            tempObj["postShares"] = contextVariables.postShares[i-postSharesMinusCounter];
        } else { postSharesMinusCounter++; tempObj["postShares"] = "";}

        tempObj["postDateTime"] = contextVariables.postDateTime[i];


        obj.push(tempObj);
    }


    callback(obj);
};

var checkTagExist = function(tag){
    if(!casper.exists(tag))
        contextVariables.push({});
    else return true;
};

var checkContentExist = function(postInfo, postContent, i){
    if (postInfo.indexOf(postContent) > -1) {
        return true;
    }
        return false;
};

var stdout = function(buildedObject){
    require('utils').dump(buildedObject);
};

casper.run(function(){
    this.exit();

});


