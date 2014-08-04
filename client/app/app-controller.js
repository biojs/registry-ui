angular.module('registry').controller('AppController', function ($scope, ComponentFilter) {
    $scope.filter = new ComponentFilter();
    //$scope.filter.togglePresent('A');
});
