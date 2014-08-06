angular.module('registry').factory("Component", function ($http, $window, $sce) {

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
        if (!_(component.npm.readmeFilename).isEmpty() &&
            !component.npm.readme.substring(0, 5) === "ERROR") {
            component.columns['readme'] =
                $sce.trustAsHtml('<a href="'+component.npm.readmeFilename+'">README</a>');
            component.tags.push("has:readme");
        }
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

        // add the current version
        component.version = component.npm['dist-tags'].latest;
    }

    function Component() {}
    Component.prototype = {};
    Component.constructor = Component;

    Component.query = function query() {
        var all = [];
        $window.JSON_CALLBACK = function JSON_CALLBACK(resp) {
            Object.keys(resp).forEach(function(key) {
                all.push(resp[key]);
                preProcessComponent(resp[key]);
            });
        };
        all.$promise = $http.jsonp('https://biojs.github.io/registry/output.jsonp');
        return all;
    };

    return Component;

});
