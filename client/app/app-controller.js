angular.module('registry').controller('AppController', function ($scope, Component, ComponentFilter) {
    $scope.filter = new ComponentFilter();
    $scope.components = Component.query();

    $scope.layout = 'table';
    $scope.displayedComponents = [];
    $scope.$watch("filter", function() {
      $scope.displayedComponents = $scope.components.filter($scope.filter.match.bind($scope.filter));
    }, true);
});
