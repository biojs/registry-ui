angular.module('registry').service("Component", function ($http, $window, $sce) {

    function preProcessComponent(component) {
        component.columns = {
            build: null, tests: null, readme: null, demos: null,         };
        component.tags = [];
        _(component.latest.shields).forEach(function (shield, key) {
            switch (key) {
                case 'build': case 'tests': {
                    component.columns[key] =
                        $sce.trustAsHtml('<a class="shield" href="'+shield.href+'"><img src="'+shield.img+'"></a>');
                    component.tags.push("has:"+key);
                } break;
            }
        });
        if (false) { // TODO
            component.columns['jsdocs'] =
                $sce.trustAsHtml('<a href="???">???</a>');
            component.tags.push("has:jsdocs");
        }

        //// use a little ✗ for missing columns
        _(component.columns).forEach(function (colHTML, type) {
            if (!colHTML) {
                component.columns[type] = $sce.trustAsHtml('✗');
            }
        });

        // defaults
        component.avatar = "https://sigil.cupcake.io/" + component.name;


        // readme
        if (!_(component.readmeFilename).isEmpty() &&
            !component.readme.substring(0, 5) === "ERROR") {
            component.columns['readme'] =
                $sce.trustAsHtml('<a href="'+component.readmeFilename+'">README</a>');
            component.tags.push("has:readme");
         }


        component.strCreated = moment(component.created).fromNow();
        component.strModified = moment(component.modified).fromNow();
        // modified and created are two keys
        component.releases = component.versions;
        component.issueHref = component.bugs.url;

        if(component.author != undefined){
          component.avatar = "https://sigil.cupcake.io/" + component.author.name;
        }

        component.downloads = component.npmDownloads;
        component.tags = component.keywords;

        // snippets
        if(component.latest.sniper !== undefined){
          var baseURL = "http://workmen.biojs.net/demo/" + component.name ;
          var jsBinURL = "http://workmen.biojs.net/jsbin/" + component.name ;
          var codePenURL = "http://workmen.biojs.net/codepen/" + component.name ;

          component.snipURL = $sce.trustAsResourceUrl(baseURL);
          component.firstSnipURL = $sce.trustAsResourceUrl(baseURL + "/" + component.latest.sniper.first);
          component.firstSnipBinURL = $sce.trustAsResourceUrl(jsBinURL + "/" + component.latest.sniper.first);
          component.firstSnipCodePenURL = $sce.trustAsResourceUrl(codePenURL + "/" + component.latest.sniper.first);

          component.tags.push("has:demos");

          // maybe the github repo might be wrong
          if(component.latest.sniper.srcs != undefined){
            component.snipNum = Object.keys(component.latest.sniper.srcs).length;
            component.columns['demos'] =
              $sce.trustAsHtml('<img src="http://img.shields.io/badge/%23-'+component.snipNum+'-blue.svg">');
          }
        }

        // github
        if(component.github !== null){
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
          component.stars = 0;
        }

        // copy to lowercase (for searching)
        component.lName = component.name.toLowerCase();
        if( component.description !== undefined ){
          component.lDescription = component.description.toLowerCase();
        }


        component.citeHref = "";
        component.readme = "";
    }

    function Component() {}
    Component.prototype = {};
    Component.constructor = Component;

    Component.list = [];

    Component.query = function query() {
        var all = [];


        $window.JSON_CALLBACK = function JSON_CALLBACK(resp) {
            Object.keys(resp).forEach(function(key) {
                all.push(resp[key]);
                preProcessComponent(resp[key]);
            });
        };

        var promise;
        //all.$promise = promise = $http.jsonp('http://localhost:3000/all');

        // ugly workaround to inject code - try GET
        all.$promise = promise = $http.get('http://workmen.biojs.net/all').success(function(response) {
            console.log("protractor json injection successful.");
            if(all.length === 0){
                $window.JSON_CALLBACK(response);
            }
        });

        Component.list = all;

        return all;
    };

    return Component;

});
