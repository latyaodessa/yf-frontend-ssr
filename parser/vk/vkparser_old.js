var casper = require('casper').create(
        {
            pageSettings: {
                webSecurityEnabled: false,
                loadImages:  false,
                loadPlugins: false
            },
           //verbose: true,
           //logLevel: "debug"
        }
    ),
    x = require('casper').selectXPath;

casper.start(function(){}).viewport(1600,1000);

var pageId = casper.cli.get(0),
    pageType = casper.cli.get(1),
    pageSet = casper.cli.get(2),
    lastSet = casper.cli.get(3),
    pagesList =[],
    contextVariables = [],
    buildedObject = [],
    newline = /<br\s*[\/]?>/gi,
    regex = /(<([^>]+)>)/ig;

    casper.thenOpen(pageId);
casper.then(function(){
    this.capture('test.png');

});



/// Get Page ID
casper.then(function(){
        pageId = this.getElementAttribute('#page_wall_header', 'href');
        if (pageId.indexOf('=1'))
            pageId = pageId.replace('=1', '');
        pageId = pageId.replace(/\D+/g, '');
});


// CHECK WHICH PAGE shoud open
casper.then(function(){
    getAllPages();

});
var getAllPages = function(){

    if(pageType == 'public') fillPagesList('https://vk.com/wall-','?offset=','&own=1');
    else if(pageType == 'group') fillPagesList('https://vk.com/wall-','?offset=');
    else if(pageType == 'user_all') fillPagesList('https://vk.com/wall','?offset=');
    else if(pageType == 'user_own') fillPagesList('https://vk.com/wall','?offset=','&own=1');
};
var fillPagesList = function(first,middle,end){
    for (;pageSet <= lastSet; pageSet += 20) {
        if(end)
            pagesList.push(first+pageId+middle+pageSet+end);
        else
            pagesList.push(first+pageId+middle+pageSet);
    }
}
casper.then(function() {
    var i = 0;
    this.each(pagesList, function (self, link) {
        self.thenOpen(link, function () {

            contextVariables = [];
            this.then(function(){
                if (checkTagExist('div[class=post]'))
                    contextVariables.push(this.getElementsAttribute('div[class=post]', 'id'));
                if (checkTagExist('.wall_post_text'))
                    contextVariables.push(this.getElementsInfo('.wall_post_text').map(function (a) {return a.tag;}));
                if (checkTagExist('.wall_signed_by'))
                    contextVariables.push(this.getElementsInfo('.wall_signed_by').map(function (a) {return a.text;}));
                if (checkTagExist(x("//span[contains(@class,'post_like_count fl_l')]")))
                    contextVariables.push(this.getElementsInfo(x("//span[contains(@class,'post_like_count fl_l')]")).map(function (a) {return a.text;}));
                if (checkTagExist(x("//span[contains(@class,'post_share_count fl_l')]")))
                    contextVariables.push(this.getElementsInfo(x("//span[contains(@class,'post_share_count fl_l')]")).map(function (a) {return a.text;}));

                contextVariables.push(this.getElementsInfo(x("//small/a/span[contains(@class,'rel_date')]")).map(function (a) {return a.text;}));
                // always last
                contextVariables.push(this.getElementsInfo('.post_info').map(function (a) {return a.tag;})); // context checker

            });


            this.then(function(){

                    build(contextVariables, function(array) {
                        for(var key in array)
                            buildedObject = buildedObject.concat(array[key]);

                })
            });

            });
    });
});
casper.then(function(){
   stdout(buildedObject);
});

var checkTagExist = function(tag){
    if(!casper.exists(tag))
        contextVariables.push({});
    else return true;
};

var concatenate = function(array){
    for(var key in array)
        buildedObject = buildedObject.concat(array[key]);
};
var build = function(array,callback){
    var obj = [],
        authorCounter = 0,
        explain = 0, // if attached post
        postTextcounter = 0,
        existence = 0;

    for(key in array[array.length-1]) {
        var temp = new Object();
        // Chech attached post
        if((array[array.length-1][key].indexOf('<span class="explain">') > -1)) {
            temp["postId"] = casper.getElementAttribute(x("//div[contains(@id,'wpt')]"),'id');
            explain++;
        }
        else
            temp["postId"] = array[0][key-explain];

        existence = checkExistence(array,key,'wall_post_text',1,postTextcounter);
        temp["postText"] = existence[0].replace(newline," ").replace(regex,"");
        postTextcounter=existence[1];

        existence = checkExistence(array,key,'wall_signed_by',2,authorCounter);
        temp["postAuthor"] =existence[0];
        authorCounter=existence[1];
        if(array[3][key]=="")
            temp["postLikes"] = 0;
        else
            temp["postLikes"] = array[3][key];
        if(array[4][key] =="")
            temp["postShares"] = 0;
        else
            temp["postShares"] = array[4][key];
        temp["postDateTime"] = array[5][key];



        obj.push(temp);
    }

    callback(obj);
};
var checkExistence = function(array,key,tag,position,counter) {
    if (!(array[array.length-1][key].indexOf(tag) > -1)) {
        return ["", ++counter];
    }
    else
        return [array[position][key-counter],counter];

};

var stdout = function(buildedObject){
    require('utils').dump(buildedObject);
};

casper.run(function(){
    this.exit();

});