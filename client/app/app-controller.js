angular.module('registry')


.controller('AppController', function ($scope, $route, $routeParams, $location, Component, ComponentFilter) {

    $scope.filter = new ComponentFilter();
    $scope.components = Component.query();

    $scope.layout = 'table';

    $scope.displayedComponents = []; 
    $scope.$watch("filter", updateDisplayed, true);
    $scope.$watchCollection("components", updateDisplayed);

    $scope.switchView = function(name){
        $location.path( "detail/" + name );
    }

    function updateDisplayed() {
      $scope.displayedComponents = $scope.components.filter($scope.filter.match.bind($scope.filter));
      if($scope.filter.searchTerm !== null && $scope.filter.searchTerm !== ""){
          var path = $location.path();
          if(path.indexOf("/detail") >= 0){
            $location.path("/");
          }
          console.log($location.url());
          console.log($location);
      }
    }
})