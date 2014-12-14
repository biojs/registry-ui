angular.module('registry').directive('componentFilter', [function () {
    return {
        restrict: 'E',
        templateUrl: TEMPLATE_URL + 'component-filter/component-filter-view.html',
        replace: true,
        scope: true,
        link: function postLink($scope, iElement, iAttrs/*, controller*/) {
            $scope.filter = $scope.$parent.$eval(iAttrs.filter);
        }
    };
}]);
