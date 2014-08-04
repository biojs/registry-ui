angular.module('registry').directive('componentRow', [function () {
    return {
        restrict: 'A',
        templateUrl: 'component-row/component-row-view.html',
        replace: false,
        scope: true,
        link: function ($scope, iElement, iAttrs/*, controller*/) {
            $scope.component = $scope.$parent.$eval(iAttrs.component);
        }
    };
}]);
