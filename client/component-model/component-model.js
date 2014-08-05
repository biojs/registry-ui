angular.module('registry').factory("Component", function ($http, $window) {

    function preProcessComponent(component) {
        if (!_(component.npm.readmeFilename).isEmpty() &&
            !component.npm.readme.substring(0, 5) === "ERROR") {
            component.tags.push("has:readme");
        }
        if (false) { // TODO
            component.tags.push("has:readme");
        }
        if (false) { // TODO
            component.tags.push("has:jsdocs");
        }
        if (component.shields.testing) {
            component.tags.push("has:tests");
        }
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
        all.$promise = $http.jsonp('https://biojs.github.io/registry/output.jsonp?callback=JSON_CALLBACK');
        return all;
    };

    return Component;

});
