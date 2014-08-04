angular.module('registry').factory("Component", function ($http) {

    function Component() {}
    Component.prototype = {};
    Component.constructor = Component;

    Component.query = function query() {
        var all = [];
        all.$promise = $http({
            url: "admin.json"
        }).then(function (resp) {
            Object.keys(resp.data.components).forEach(function(key) {
                all.push(resp.data.components[key]);
            });
        });
        return all;
    };

    return Component;

});
