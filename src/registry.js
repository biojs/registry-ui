;(function() {

  angular.module("registry", ["registry.models"])
    .controller("list", ListController)
    .filter("present", function() {
      return function(item, field) {
        return item[field] ? "✓" : "✗";
      }
    })
    .filter("componentFilter", function() {
      return function(array, filter) {

      }
    });
    

  function ListController($scope, Component) {
    $scope.components = Component.query();
  }

  function ComponentFilter() {
    this.tags = {};
    this.searchTerm = null;
  }

  ComponentFilter.prototype = {
    togglePresent: function(tag) {
      this.tags[tag] = 1;
    },
    match: function(components) {
      return components.filter(function(component) {

      });
    }
  };

})();
