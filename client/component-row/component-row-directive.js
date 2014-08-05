angular.module('registry').directive('componentRow', function (notDisplayedInColumn) {
    return {
        restrict: 'A',
        templateUrl: 'component-row/component-row-view.html',
        replace: false,
        scope: {
          filter: "=",
          component: "=",
        },
        link: function ($scope, iElement, iAttrs/*, controller*/) {
            $scope.notDisplayedInColumn = notDisplayedInColumn;
        }
    };
});
