
/*
   var fs = require("fs");
   var dd = {};
   fs.readFile('./output.jsonp', 'utf8', function (err,data) {
   if (err) {
   return console.log(err);
   }
   });
   */
// FIXME: Use HttpBackend in the Component Model Service to test sustainably across a fixed mock data set
/* var HttpBackend = require('httpbackend');
var backend = null;

var mockAll = require("./my-mock"); */


describe('biojs registry', function() {

  var searchBox = element(by.model('filter.searchTerm'));
  var hiddenCount = element(by.binding("hiddenCount"));
  var table = element.all(by.repeater("component in components | filter:filterFn"));
  var seqTag = element(by.name("sequence"));
  var downloadButton = element(by.css('.glyphicon-download-alt'));

  beforeEach(function(){
    browser.get(browser.params.url);
  });

  

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('BioJS Registry');
  });

  it('should have results', function() {
    browser.wait(function(){
     return  $('.component-list .listview-name').isPresent();
    });
    expect(table.count()).toEqual(160);
  });

  it('should filter on search', function() {

    searchBox.sendKeys("clustal");
    //browser.debugger();

    // expect(hiddenCount.getText()).toEqual("4 components hidden"); // still to be implemented: 26/07/2016
    expect(table.count()).toEqual(2);
  });

  /* it('should filter on tags', function() {

    seqTag.click();
    expect(table.count()).toEqual(2);
  }); */ // not working yet in current state of the app: 26/07/2016

  /* it('should filter on tags and search', function() {
    
    seqTag.click();
    searchBox.sendKeys("clustal");
    expect(table.count()).toEqual(1);

  }); */ // not implemented yet: 26/07/2016
  
  it('should list components whose names are not all lowercase', function(){
 
    searchBox.sendKeys("protvista");
    expect(table.count()).toEqual(1);

    $(".listview-name").click();
    browser.wait(function(){
      return  $('.glyphicon-download-alt').isPresent();
    });
    
  });

});
