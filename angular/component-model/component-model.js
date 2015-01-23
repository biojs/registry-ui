angular.module('registry').service("Component", function ($http, $window, $sce, $q) {

    function preProcessComponent(component) {
        component.columns = {
            build: null, tests: null, readme: null, demos: null,  reference: null, website: null };
        /*
        component.tags = [];
        if(component.latest){
          _(component.latest.shields).forEach(function (shield, key) {
              switch (key) {
                  case 'build': case 'tests': case 'website': case 'reference':{
                      component.columns[key] =
                          $sce.trustAsHtml('<a class="shield" href="'+shield.href+'"><img src="'+shield.img+'"></a>');
                      component.tags.push("has:"+key);
                  } break;
              }
          });
        }
        if (false) { // TODO
            component.columns['jsdocs'] =
                $sce.trustAsHtml('<a href="???">???</a>');
            component.tags.push("has:jsdocs");
        }
        // remove duplicates - angular doesn't like them
        component.tags = _.uniq(component.tags);
        */

        //// use a little ✗ for missing columns
        _(component.columns).forEach(function (colHTML, type) {
            // if (!colHTML) {
            //     component.columns[type] = $sce.trustAsHtml('✗');
            // }
        });

        // defaults
        component.avatar = "https://sigil.cupcake.io/" + component.name;
        component.registryHeight = "400";


        /*
        // readme
        if (!_(component.readmeFilename).isEmpty() &&
            !component.readme.substring(0, 5) === "ERROR") {
            component.columns['readme'] =
                $sce.trustAsHtml('<a href="'+component.readmeFilename+'">README</a>');
            //component.tags.push("has:readme");
         }
         */


        component.strCreated = moment(component.created).fromNow();
        component.strModified = moment(component.modified).fromNow();
        // modified and created are two keys
        component.releases = component.versions;

        if(component.bugs){
          component.issueHref = component.bugs.url;
        }

        if(component.author !== undefined){
          component.avatar = "https://sigil.cupcake.io/" + component.author.name;
        }

        component.downloads = component.npmDownloads;
        component.tags = component.keywords;
        // remove duplicates - angular doesn't like them
        component.tags = _.uniq(component.tags);

        component.authors = "Unknown";
        if(component.author !== undefined){
          component.authors = [component.author];
          if(component.author.url != undefined){
            component.authors[0].url = component ;
          }
        }
        if(component.contributors !== undefined){
          component.authors = component.contributors;
        }

        // snippets
        if(component.latest !== undefined && component.latest.sniper !== undefined){
         
          // maybe the github repo might be wrong
          if(component.latest.sniper.srcs != undefined){
            component.snipNum = Object.keys(component.latest.sniper.srcs).length;
            component.columns['demos'] =
              $sce.trustAsHtml('<img src="http://img.shields.io/badge/%23-'+component.snipNum+'-blue.svg">');
            component.snips = _.keys(component.latest.sniper.srcs);
          }

          if(component.snips != undefined){
            component.selectedSnip = component.latest.sniper.first || component.snips[0];
            updateSnippets(component);
            component.tags.push("has:demos");
          }
        }

        // biojs stuff
        if(component.latest !== undefined && component.latest.biojs !== undefined){
          component.registryHeight = component.latest.biojs.registryHeight || component.registryHeight;
          component.registryHeight.trim().replace("px", ""); // just in case
        }

        // github
        if(component.github !== undefined && component.github.owner !== undefined){
          //component.starbutton = $sce.trustAsResourceUrl("http://ghbtns.com/github-btn.html?user=" + component.github.owner.login 
                                        //+ "&repo=" + component.name + "&type=watch&count=true");
          component.stars = component.github.stargazers_count;
          component.watchers = component.github.subscribers_count;
          component.forks = component.github.forks_count;
          component.issues = component.github.open_issues_count;
          //component.issueHref = component.issues_url;
          component.avatar = component.github.owner.avatar_url;
          component.src = component.github.html_url;
          component.commits = component.github.commits;
          if(component.github.contribs !== undefined){
            component.contributors = Object.keys(component.github.contribs).length;
          }else{
            component.contributors = 0;
          }
          component.readmeSrc = "http://github-raw-cors-proxy.herokuapp.com/"+component.github.full_name+ "/blob/"+component.github.default_branch+"/" + component.readmeFilename;

        }else{
          console.log("no github repo found for %s", component.name);
          component.stars = 0;
        }

        // copy to lowercase (for searching)
        component.lName = component.name.toLowerCase();
        if( component.description !== undefined ){
          component.lDescription = component.description.toLowerCase();
        }

        // biojs settings overwrite github
        if(component.latest !== undefined && component.latest.biojs !== undefined){
          var cBio = component.latest.biojs;
          if(cBio.logo !== undefined){
            var hasFileExtension = /^.*\.[^\\]+$/;
            // fallback to a default logo
            if(! hasFileExtension.test(cBio.logo)){
              cBio.logo += "logo.png";
            }
            cBio.logo = component.github.raw_url + cBio.logo;
            component.avatar = cBio.logo;
          }
        }

        component.citeHref = "";
        component.readme = "";

        return component;
    }

    function getPackage(name,components){
      for(var index in components){
        // search for package - probably there is a more efficient way
        if(components[index].name === name){
          return index;
        }
      }
      return -1;
    }
 

    function Component() {}
    Component.prototype = {};
    Component.constructor = Component;

    Component.list = [];

    Component.single = function single(name) {
        var p = $q.defer();
        var url = 'http://workmen.biojs.net/detail/' + name;
        //url = 'http://localhost:3000/detail/'+ name;
        $http.get(url).success(function(resp) {
            //all.push(resp[key]);
            var com = preProcessComponent(resp);
            var index = getPackage(name,Component.list);
            if(index >= 0){
              Component.list[index] = com;
            }else{
              Component.list.push(com);
            }
            p.resolve(com);
        });
        return p.promise;
    };

    Component.query = function query() {
        var all = [];

        var p = $q.defer();

        // ugly workaround to inject code - try GET
        var url = 'http://workmen.biojs.net/all?short=1';
        //url = 'http://localhost:3000/all?short=1';
          $http.get(url).success(function(resp) {
              if(all.length === 0){
                Object.keys(resp).forEach(function(key) {
                  all.push(resp[key]);
                  preProcessComponent(resp[key]);
                });
                Component.list = all;
                p.resolve(all);
              }else{
                  p.reject("already loaded");
              }
          });
        return p.promise;
    };

    return Component;

});
