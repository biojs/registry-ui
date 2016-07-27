
/*
   var fs = require("fs");
   var dd = {};
   fs.readFile('./output.jsonp', 'utf8', function (err,data) {
   if (err) {
   return console.log(err);
   }
   });
   */


require("./dummy2");
//FIXME: somehow the injection of a default json output is broken

describe('biojs registry', function() {

  var searchBox = element(by.model('filter.searchTerm'));
  var hiddenCount = element(by.binding("hiddenCount"));
  var table = element.all(by.repeater("component in components | filter:filterFn"));
  var seqTag = element(by.name("sequence"));

  beforeEach(function(){
    browser.get(browser.params.url);
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('BioJS Registry');
  });

  it('should have results', function() {
    expect(table.count()).toEqual(5);
 
  });

  it('should filter on search', function() {

    searchBox.sendKeys("clustal");

    expect(hiddenCount.getText()).toEqual("4 components hidden");
    expect(table.count()).toEqual(1);
  });

  it('should filter on tags', function() {

    seqTag.click();
    expect(table.count()).toEqual(2);
  });

  it('should filter on tags and search', function() {
    
    seqTag.click();
    searchBox.sendKeys("clustal");
    expect(table.count()).toEqual(1);

  });

});
