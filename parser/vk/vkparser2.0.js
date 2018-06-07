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

casper.start(function(){}).viewport(1600,1000);

var wallId = casper.cli.get(0),
    firstPageSet = casper.cli.get(1),
    lastPageSet = casper.cli.get(2);

var publicPageFirstPart = 'https://vk.com/wall-'+ wallId +'?offset=',
    publicPageLastPart = '&own=1',
    pagesList =[],
    regex = /[-_0-9]*$/ig,
    re = /[-_0-9]*$/,
    ids=[];




var currentPage = function(publicPageFirstPart, pageSet ,publicPageLastPart){
    return publicPageFirstPart+pageSet+publicPageLastPart;
};

casper.thenOpen(currentPage(publicPageFirstPart,firstPageSet, publicPageLastPart));

casper.then(function(){
    for (;firstPageSet < lastPageSet; firstPageSet += 20) {
        pagesList.push(currentPage(publicPageFirstPart,firstPageSet, publicPageLastPart));
    }
});

casper.then(function() {
    var i = 0;
    this.each(pagesList, function (self, link) {
        self.thenOpen(link, function () {


            this.each(this.getElementsAttribute('.post_link', 'href'),  function(allpost, onepost){
                    ids.push(onepost.match(re)[0]);
            })

        });
    });
});





casper.then(function(){
    require('utils').dump(ids);
})


casper.run(function(){
    this.exit();

});


