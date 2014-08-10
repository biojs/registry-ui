angular.module('registry').controller('AppController', function ($scope, Component, ComponentFilter) {
    $scope.filter = new ComponentFilter();
    $scope.components = Component.query();

    $scope.layout = 'table';

    //$scope.layout = 'detail';

    $scope.displayedComponents = []; 
    $scope.$watch("filter", updateDisplayed, true);
    $scope.$watchCollection("components", updateDisplayed);

    function updateDisplayed() {
      $scope.displayedComponents = $scope.components.filter($scope.filter.match.bind($scope.filter));
    }
});
