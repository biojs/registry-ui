angular.module('registry').service("Component", function ($http, $window, $sce) {

    function preProcessComponent(component) {
        component.columns = {
            build: null, tests: null, readme: null, demos: null, jsdocs: null
        };
        _(component.shields).forEach(function (shield) {
            switch (shield.type) {
                case 'build': case 'tests': {
                    component.columns[shield.type] =
                        $sce.trustAsHtml('<a class="shield" href="'+shield.href+'"><img src="'+shield.img+'"></a>');
                    component.tags.push("has:"+shield.type);
                } break;
            }
        });
              if (false) { // TODO
            component.columns['demos'] =
                $sce.trustAsHtml('<a href="???">???</a>');
            component.tags.push("has:demos");
        }
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
        component.avatar = "https://avatars.githubusercontent.com/u/103119?v=2";

        // npm
        if(component.npm !== undefined ){

          // readme
          if (!_(component.npm.readmeFilename).isEmpty() &&
              !component.npm.readme.substring(0, 5) === "ERROR") {
              component.columns['readme'] =
                  $sce.trustAsHtml('<a href="'+component.npm.readmeFilename+'">README</a>');
              component.tags.push("has:readme");
           }


          component.version = component.npm['dist-tags'].latest;
          component.license = component.npm.license;
          component.created = component.npm.time.created;
          component.strCreated = moment(component.created).fromNow();
          component.modified = component.npm.time.modified;
          component.strModified = moment(component.created).fromNow();
          // modified and created are two keys
          component.releases = Object.keys(component.npm.versions).length;
          component.issueHref = component.npm.bugs.url;
          component.author = component.npm.author;
          component.description = component.npm.description;
        }

        // github
        if(component.github !== undefined ){
          component.version = component.npm['dist-tags'].latest;
          component.stars = component.github.stargazers_count;
          component.watchers = component.github.subscribers_count;
          component.forks = component.github.forks_count;
          component.issues = component.github.open_issues_count;
          //component.issueHref = component.issues_url;
          component.avatar = component.github.owner.avatar_url;
          component.src = component.github.html_url;

          // README
          if(component.npm !== undefined ){
            // github readme
            component.readmeSrc = "http://github-raw-cors-proxy.herokuapp.com/"+component.github.full_name+ "/blob/"+component.github.default_branch+"/" + component.npm.readmeFilename;
          }

        }

        component.issues = 0;
        component.commits = 0;
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
        all.$promise = promise = $http.jsonp('http://worker.biojs.net/output.jsonp');

        // ugly workaround to inject code - try GET
        promise.error(function(){
            $http.get('http://worker.biojs.net/output.json').success(function(response) {
                console.log("protractor json injection successful.");
                if(all.length === 0){
                    $window.JSON_CALLBACK(response);
                }
            });
        });

        Component.list = all;

        return all;
    };

    return Component;

});
