;(function() {

  var models = angular.module("registry.models", []);

  models.factory("Component", function($http) {

    function Component() {
    }

    Component.prototype = {
      badges: function() {
      },
    };
    Component.constructor = Component;

    Component.query = function() {
      var all = [];
      var prom = $http({
        url: "/admin.json",
        transformResponse: function(raw) {
          return JSON.parse(raw.replace(/\n/g,""));
        },
      }).then(function(resp) {
        resp.data.components.forEach(function(c) {
          all.push(c);
        });
      });

      all.$promise = prom;

      return all;
    }

    return Component;

  });




  
})();
